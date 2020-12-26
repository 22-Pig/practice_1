const iot = require('alibabacloud-iot-device-sdk');

//创建iot.device对象将会发起到阿里云IoT的连接
const device = iot.device({
    productKey: "a1nZJ6Oxg9s",
    deviceName: 'Tem_man',
    deviceSecret: 'c4fd5f456793847a1d678bac2c336799',
});

//监听connect事件
device.on('connect', () => {
    // 从某个主题接收消息
    device.subscribe('/a1nZJ6Oxg9s/Tem_man/user/get');
    console.log('connect successfully!');
    // 发送消息到某个主题
    device.publish('/a1nZJ6Oxg9s/Tem_man/user/update', 'IoT');
});

//监听message事件
device.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});

// 上报设备属性
device.postProps({
    CurrentTemperature: Temp
}, (resp) => {
    console.log(resp);
});

var Temp = 0;

// 监听云端设置属性服务消息，示例代码为一个灯
device.onProps((cmd) => {
    // console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'CurrentTemperature') { //判断是否设置的是CurrentTemperature属性
            console.log('Temp的状态:', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            Temp = Number(cmd.params.CurrentTemperature);
            console.log('下发' + Temp);
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            device.postProps({ 'CurrentTemperature': Temp });
        }
    }
});

module.exports = {
    device: device,
};