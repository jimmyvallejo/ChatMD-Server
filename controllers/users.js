
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


module.exports = {
  getProfile,
  addPicture,
  editProfile,
  profileDelete
};