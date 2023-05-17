const User = require("../models/User");
const Conversation = require("../models/Conversation")
const openai = require("../config/open.config");
const { getChatCompletion } = require("../services/openaiService");
const FormData = require("form-data");
const axios = require('axios')


const chat = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const messages = [
      {
        role: "system",
       content: "You are an online doctor treating me for any ailments or illnesses I may have.",
      },
      {role: "user",
        content: `Hello my name is ${user.name}`}
    ]; 
    const completion = await getChatCompletion(messages);
       console.log({User: messages[1].content, ChatMD: completion})
    res.json({User: messages[1].content, ChatMD: completion});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};


const postChat = async (req, res) => {
  const { pre_conditions, message } = req.body;

  try {
    let messages; 

    if (!pre_conditions) {
      messages = [
        {
          role: "system",
          content:
            "You are an online doctor treating me for any ailments or illnesses I may have.",
        },
        { role: "user", content: message },
      ];
    } else {
      messages = [
        {
          role: "system",
          content:
            "You are an online doctor treating me for any ailments or illnesses I may have.",
        },
        {
          role: "user",
          content: `${message} my pre-existing conditions are ${pre_conditions.join(
            ", "
          )}`,
        },
      ];
    }

    const completion = await getChatCompletion(messages);

    res.json({ User: message, ChatMD: completion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

const uploadAudio = async (req, res) => {
  const audioFile = req.file.buffer;

  const formData = new FormData();
  formData.append("file", audioFile, {
    contentType: "audio/mp3",
    filename: "tempfile." + req.file.mimetype.split("/")[1],
  });
  formData.append("model", "whisper-1");

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_KEY}`,
          ...formData.getHeaders(),
        },
      }
    );
   console.log(response.data)
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error transcribing audio");
  }
}

const postConversation = async (req, res) => {
 
  const {
    discussion: { title, dialogue },
    owner,
  } = req.body;

  const newConversation = {
    owner,
    discussion:{
      title,
      dialogue
    }
  };

  try {
    let createdConvo = await Conversation.create(newConversation);
    console.log(createdConvo);
    let updateUser = await User.findByIdAndUpdate(
      owner,
      {
        $push: { conversations: createdConvo._id },
      },
      { new: true }
    );
    res.json({ updateUser, createdConvo });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.toString() });
  }
}

module.exports = {
  chat, postChat, uploadAudio, postConversation
};