const dbPool = require("../config/poolConfig");

module.exports = {
    reportTempDB(sql, arr, cb) {
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    getTempDB(arr, cb) {
        var sql = "select * from temp WHERE id = ? order by time desc limit 10";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    reportHumdDB(sql, arr, cb) {
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    getHumdDB(arr, cb) {
        var sql = "select * from humd WHERE id = ? order by time desc limit 10";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    reportSmokeDB(sql, arr, cb) {
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    getSmokeDB(arr, cb) {
        var sql = "select * from smoke WHERE id = ? order by time desc limit 10";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    displayTempDB(arr, cb) {
        const sql = "SELECT * FROM device WHERE type = 'temp'";
        dbPool.connect(sql, arr, function (err, data) {
            console.log(data);
            cb(err, data);
        });
    },
    displayHumdDB(arr, cb) {
        const sql = "SELECT * FROM device WHERE type = 'humd'";
        dbPool.connect(sql, arr, function (err, data) {
            console.log(data);
            cb(err, data);
        });
    },
    displayLedDB(arr, cb) {
        const sql = "SELECT * FROM device WHERE type = 'led'";
        dbPool.connect(sql, arr, function (err, data) {
            console.log(data);
            cb(err, data);
        });
    },
}