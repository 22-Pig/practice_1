const infoDao = require("../dao/infoDao");

module.exports = {
    info: (req, resp) => {
        infoDao.infoDB(function (err, data) {
            if (err) {
                return;
            }
            else {
                if (data) {
                    resp.send(data);
                    console.log('zhe' + data);
                } else {
                    // resp.send({ succ: false });
                }
            }
        });
    }
}