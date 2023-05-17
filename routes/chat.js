var express = require("express");
var router = express.Router();
var multer = require('multer')

const upload = multer(); 

const {
  chat, postChat, uploadAudio
} = require("../controllers/chat.js");

router.get("/:id", chat);

router.post("/", postChat);

router.post("/audio", upload.single('audio'), uploadAudio);



module.exports = router;