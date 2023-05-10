var express = require("express");
var router = express.Router();

const {
  chat, postChat
} = require("../controllers/chat.js");

router.get("/:id", chat);

router.post("/", postChat);



module.exports = router;