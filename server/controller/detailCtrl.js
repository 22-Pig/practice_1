const detailDao = require("../dao/detailDao");
const led = require("../service/led");
const fan = require("../service/fan");
const mot = require("../service/mot");
const callTemp = require("../service/temp");
const callHumd = require("../service/humd");
const callSmoke = require("../service/smoke");

var status = null;
var fanstatus = null;
var motstatus = null;
module.exports = {
    reportLed: function (req, resp) {
        var ledStatus = req.body.data;
        // 上报设备属性
        status = ledStatus;
        led.device.postProps({
            LightStatus: Number(ledStatus) // 从PT上传的灯的状态
        }, (resp) => {
            // console.log(resp);
        });
        var data = {
            success: true,
            ledStatus: led.getLightStatus() // 阿里云下发网关服务器,该设备应该处于什么状态
        }
        resp.send(data);
        console.log('resp' + data);
    },
    getLed: function (req, resp) {
        const data = {
            status: led.getLightStatus()
        }
        console.log('getLed' + data);
        resp.send(data);
    },
    toggleLed: function (req, resp) {
        status = req.body.status;
        console.log('toggleLed' + status);
        led.setLightStatus(status);
        resp.send({ success: true });
    },
    reportFan: function (req, resp) {
        var fanStatus = req.body.data;
        // 上报设备属性
        fanstatus = fanStatus;
        fan.device.postProps({
            PowerSwitch: Number(fanStatus) // 从PT上传的灯的状态
        }, (resp) => {
            // console.log(resp);
        });
        var data = {
            success: true,
            fanStatus: fan.getFanStatus()
        }
        resp.send(data);
        console.log('resp' + data);
    },
    getFan: function (req, resp) {
        const data = {
            fanstatus: fan.getFanStatus()
        }
        resp.send(data);
    },
    toggleFan: function (req, resp) {
        fanstatus = req.body.status;
        fan.setFanStatus(fanstatus);
        resp.send({ success: true });
    },
    reportTemp: function (req, resp) {
        const id = req.params["id"];
        const temp = req.params["temp"];
        console.log(id + temp);
        callTemp.device.postProps({
            CurrentTemperature: parseFloat(temp) // 从PT上传的灯的状态
        }, (resp) => {
            // console.log(resp);
        });
        let sql = 'INSERT INTO temp values(\'' + id + '\', ' + Date.now() + ',' + temp + ')';
        detailDao.reportTempDB(sql, [], function (err, data) {
            if (err) {
                console.log('[UPDATE ERROR] - ', err.message);
                resp.send('修改失败！');
                console.log(err);
                return;
            }
            else {
                if (data) {
                    resp.send({ id: id, status: 'success' });
                }
            }
        });
    },
    getTemp: function (req, resp) {
        const id = req.params.id;
        console.log('getTemp：' + id);
        detailDao.getTempDB(id, function (err, data) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                console.log(err);
                resp.send(JSON.stringify({
                    succ: false,
                    msg: '查询失败！'
                }));
                return;
            }
            else {
                if (data) {
                    resp.send(JSON.stringify(data));
                }
            }
        });
    },
    reportHumd: function (req, resp) {
        const id = req.params["id"];
        const humd = req.params["humd"];
        console.log(id + humd);
        callHumd.device.postProps({
            CurrentHumidity: parseFloat(humd) // 从PT上传的灯的状态
        }, (resp) => {
            // console.log(resp);
        });
        let sql = 'INSERT INTO humd values(\'' + id + '\', ' + Date.now() + ',' + humd + ')';
        detailDao.reportHumdDB(sql, [], function (err, data) {
            if (err) {
                console.log('[UPDATE ERROR] - ', err.message);
                resp.send('修改失败！');
                console.log(err);
                return;
            }
            else {
                if (data) {
                    resp.send({ id: id, status: 'success' });
                }
            }
        });
    },
    getHumd: function (req, resp) {
        const id = req.params.id;
        console.log('getHumd：' + id);
        // const humdCount = req.params.humdCount;
        // let Arr = [id];
        // Arr = Arr.toString();
        detailDao.getHumdDB(id, function (err, data) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                console.log(err);
                resp.send(JSON.stringify({
                    succ: false,
                    msg: '查询失败！'
                }));
                return;
            }
            else {
                // console.log(data);
                if (data) {
                    /* const resp = {
                        id: id,
                        data: data
                    }; */
                    // console.log(JSON.stringify(data));
                    resp.send(JSON.stringify(data));
                }
            }
        });
    },
    reportMot: function (req, resp) {
        var motStatus = req.body.data;
        motstatus = motStatus;
        mot.device.postProps({
            MotionAlarmState: Number(motstatus) // 从PT上传的灯的状态
        }, (resp) => {
            // console.log(resp);
        });
        var data = {
            success: true,
            motStatus: mot.getMotStatus()
        }
        resp.send(data);
    },
    getMot: function (req, resp) {
        const id = req.params.id;
        console.log('getMot' + id);
        const data = {
            motstatus: motstatus
        }
        console.log(data.motstatus);
        resp.send(data);
    },
    reportSmoke: function (req, resp) {
        const id = req.params["id"];
        const smoke = req.params["smoke"];
        console.log(id + smoke);
        callSmoke.device.postProps({
            CO2Value: parseFloat(smoke)
        }, (resp) => {
            // console.log(resp);
        });
        /* if (smoke > 40) {
            fan.device.postProps({
                PowerSwitch: Number(1)
            }, (resp) => {
                // console.log(resp);
            });
        }
        else {
            fan.device.postProps({
                PowerSwitch: Number(0)
            }, (resp) => {
                // console.log(resp);
            });
        } */
        let sql = 'INSERT INTO smoke values(\'' + id + '\', ' + Date.now() + ',' + smoke + ')';
        detailDao.reportSmokeDB(sql, [], function (err, data) {
            if (err) {
                console.log('[UPDATE ERROR] - ', err.message);
                resp.send('修改失败！');
                console.log(err);
                return;
            }
            else {
                if (data) {
                    resp.send({ id: id, status: 'success' });
                }
            }
        });
    },
    getSmoke: function (req, resp) {
        const id = req.params.id;
        console.log('getSmoke：' + id);
        detailDao.getSmokeDB(id, function (err, data) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                console.log(err);
                resp.send(JSON.stringify({
                    succ: false,
                    msg: '查询失败！'
                }));
                return;
            }
            else {
                if (data) {
                    resp.send(JSON.stringify(data));
                }
            }
        });
    },
    displayTemp: (req, resp) => {
        detailDao.displayTempDB(function (err, data) {
            if (err) {
                return;
            } else {
                if (data) {
                    console.log(data);
                    resp.send(data);
                } else {
                }
            }
        });
    },
    displayHumd: (req, resp) => {
        detailDao.displayHumdDB(function (err, data) {
            if (err) {
                return;
            } else {
                if (data) {
                    console.log(data);
                    resp.send(data);
                } else {
                }
            }
        });
    },
    displayLed: (req, resp) => {
        detailDao.displayLedDB(function (err, data) {
            if (err) {
                return;
            } else {
                if (data) {
                    console.log(data);
                    resp.send(data);
                } else {
                }
            }
        });
    },
}