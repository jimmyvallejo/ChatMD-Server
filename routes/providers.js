var express = require("express");
var router = express.Router();

const { findProviders, getLocation } = require('../controllers/providers')

router.post("/", findProviders)

router.post("/location", getLocation)



module.exports = router;