
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




const saltRounds = 10;

const addPicture = (req, res) => {
  res.json(req.file.path);
};


const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = await User.findById(id).populate({
      path: "conversations",
      options: { sort: { createdAt: -1 } },
    });
    res.json(foundUser);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.toString() });
  }
};

const editProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, profile_image, username, password } = req.body;
  
  try {
    if (email === "demouser@demo.com"){
      console.log("Demo account can not edit profile")
      res.status(500).json("Demo account can not edit profile")
     
    }
    const existingUser = await User.findOne({
      $or: [{ email: email }, { _id: id }],
    });

    if (existingUser.email === email) {
      return res
        .status(400)
        .json({ message: "Email or username already exists" });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPass = bcrypt.hashSync(password, salt);

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
  getUser,
  addPicture,
  editProfile,
  profileDelete,
  updateArray
};