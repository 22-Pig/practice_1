const express = require("express");
const infoCtrl = require("../controller/infoCtrl");
const router = express.Router();

router.get("/infos", infoCtrl.info);

module.exports = router;