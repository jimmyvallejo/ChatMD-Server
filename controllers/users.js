
const User = require("../models/User");


const addPicture = (req, res) => {
  res.json(req.file.path);
};




const getProfile = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
};

const editProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, profile_image, username } = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ email: email }, { _id: id }],
    });

    if (existingUser.email === email) {
      return res
        .status(400)
        .json({ message: "Email or username already exists" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: id},
        {name: name,
        email: email,
        username: username,
        profile_image: profile_image,
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    console.log({ message: err.message });
    res.status(500).json({ message: "Server error" });
  }
};


const profileDelete = (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete( id )
    .then((deletedUser) => {
      res.json(deletedUser);
    })
    .catch((err) => {
      console.log({ message: err.message });
      res.status(500).json({ message: "Internal server error" });
    });
};

const updateArray = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  try {
    const { id } = req.params;
    const update = req.body;

    const updatedArray = await User.findByIdAndUpdate(
      id,
      { $push: { pre_conditions: update } },
      { new: true } 
    );

    if (!updatedArray) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedArray);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
  getProfile,
  addPicture,
  editProfile,
  profileDelete,
  updateArray
};