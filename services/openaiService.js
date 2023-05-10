const openai = require("../config/open.config"); 

async function getChatCompletion(conversation) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: conversation,
    });

    return completion.data.choices[0].message;
  } catch (error) {
    console.error(error);
    return "Error: Unable to fetch response from API.";
  }
}

module.exports = {
  getChatCompletion,
};
