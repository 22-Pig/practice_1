const iot = require('alibabacloud-iot-device-sdk');

//创建iot.device对象将会发起到阿里云IoT的连接
const device = iot.device({
    productKey: "a1Bt4nNuilC",
    deviceName: 'LED_man',
    deviceSecret: '1ae90fb74316bbd77f2cf9d7e03674d8',
});

//监听connect事件
device.on('connect', () => {
    // 从某个主题接收消息
    device.subscribe('/a1Bt4nNuilC/LED_man/user/get');
    console.log('connect successfully!');
    // 发送消息到某个主题
    device.publish('/a1Bt4nNuilC/LED_man/user/update', 'IoT');
});

//监听message事件
device.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});

// 上报设备属性
device.postProps({
    LightStatus: lightStatus
}, (resp) => {
    console.log(resp);
});

var lightStatus = 0;

// 监听云端设置属性服务消息，示例代码为一个灯
device.onProps((cmd) => {
    // console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'LightStatus') { //判断是否设置的是LightStatus属性
            console.log('灯的状态:', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            lightStatus = Number(cmd.params.LightStatus);
            if (lightStatus == 0) {
                console.log('灯从云端关闭');
            }
            else {
                console.log('灯从云端打开');
            }
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            device.postProps({ 'LightStatus': lightStatus });
        }
    }
});

module.exports = {
    device: device,
    getLightStatus: function () {
        return lightStatus;
    },
    setLightStatus: function (status) {
        lightStatus = status;
    }
};