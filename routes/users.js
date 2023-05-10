var express = require("express");
var router = express.Router();
const fileUploader = require("../config/cloudinary.config");

const {
  profileDelete,
  getProfile,
  editProfile,
  addPicture,
} = require("../controllers/users");

router.post("/add-picture", fileUploader.single("profile_image"), addPicture);


router.get("/profile/:id", getProfile);

router.put("/profile-edit/:id", editProfile);

router.get("/profile/delete/:id", profileDelete);

module.exports = router;
