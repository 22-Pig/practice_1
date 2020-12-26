const iot = require('alibabacloud-iot-device-sdk');

//创建iot.device对象将会发起到阿里云IoT的连接
const device = iot.device({
    productKey: "a1gslYSxdVh",
    deviceName: 'fan_man',
    deviceSecret: 'd3d7eca8ce7ffee9c074426b4c4ce34d',
});

//监听connect事件
device.on('connect', () => {
    // 从某个主题接收消息
    device.subscribe('/a1gslYSxdVh/fan_man/user/get');
    console.log('connect successfully!');
    // 发送消息到某个主题
    device.publish('/a1gslYSxdVh/fan_man/user/update', 'IoT');
});

//监听message事件
device.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});

// 上报设备属性
device.postProps({
    PowerSwitch: fanStatus
}, (resp) => {
    console.log(resp);
});

var fanStatus = 0;

// 监听云端设置属性服务消息
device.onProps((cmd) => {
    for (var key in cmd.params) {
        if (key == 'PowerSwitch') {
            console.log('风扇的状态:', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将风扇打开或者关闭
            fanStatus = Number(cmd.params.PowerSwitch);
            if (fanStatus == 0) {
                console.log('风扇从云端关闭');
            }
            else {
                console.log('风扇从云端打开');
            }
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            device.postProps({ 'PowerSwitch': fanStatus });
        }
    }
});

module.exports = {
    device: device,
    getFanStatus: function () {
        return fanStatus;
    },
    setFanStatus: function (fanstatus) {
        fanStatus = fanstatus;
    }
};