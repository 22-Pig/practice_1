const dbPool = require("../config/poolConfig");

module.exports = {
    infoDB(arr, cb) {
        const sql = "SELECT * FROM device";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    }
}