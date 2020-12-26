// 拦截请求，分发任务
const express = require("express");
const detailCtrl = require("../controller/detailCtrl");
const router = express.Router();

// router.post("/detail", detailCtrl.detail);

router.post("/reportLed", detailCtrl.reportLed);

router.get("/getLed", detailCtrl.getLed);

router.post("/toggleLed", detailCtrl.toggleLed);

router.post("/reportFan", detailCtrl.reportFan);

router.get("/getFan", detailCtrl.getFan);

router.post("/toggleFan", detailCtrl.toggleFan);

router.post("/reportMot", detailCtrl.reportMot);

router.get("/getMot/:id", detailCtrl.getMot);

router.put('/temp/:id/:temp/', detailCtrl.reportTemp);

router.get('/temp/:id', detailCtrl.getTemp);

router.put('/humd/:id/:humd/', detailCtrl.reportHumd);

router.get('/humd/:id', detailCtrl.getHumd);

router.put('/smoke/:id/:smoke/', detailCtrl.reportSmoke);

router.get('/smoke/:id', detailCtrl.getSmoke);

router.get('/displayTemp', detailCtrl.displayTemp);

router.get('/displayHumd', detailCtrl.displayHumd);

router.get('/displayLed', detailCtrl.displayLed);

module.exports = router;