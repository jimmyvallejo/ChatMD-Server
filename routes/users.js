var express = require("express");
var router = express.Router();
const fileUploader = require("../config/cloudinary.config");

const {
  profileDelete,
  getUser,
  editProfile,
  addPicture,
  updateArray,
} = require("../controllers/users");

router.post("/add-picture", fileUploader.single("profile_image"), addPicture);


router.get("/:id", getUser);

router.put("/profile-edit/:id", editProfile);

router.put("/updateArray/:id", updateArray)

router.get("/profile/delete/:id", profileDelete);

module.exports = router;
