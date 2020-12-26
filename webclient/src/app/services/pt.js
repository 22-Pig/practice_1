var url = 'http://127.0.0.1:8080/';
var led_pin = 0;
var fan_pin = 1;
var mot_pin = 2;
var door_pin = 3;
var ledStatus = 0;
var fanStatus = 0;
function setup() {
    pinMode(led_pin, OUTPUT);
    pinMode(fan_pin, OUTPUT);
    pinMode(mot_pin, OUTPUT);
    pinMode(door_pin, OUTPUT);
}
function loop() {
    // var ledStatus = JSON.stringify(ledStatus);
    RealHTTPClient.post(url + 'reportLed/', { "data": ledStatus }, function (status, data) {
        Serial.println(data);
        var result = JSON.parse(data);
        if (data) { // 判断服务器是否应答了
            if (result.success) {
                if (result.ledStatus == 0) {
                    digitalWrite(led_pin, LOW);
                    digitalWrite(door_pin, LOW);
                    ledStatus = 0;
                    Serial.println('灯灭 && 关门');
                }
                else {
                    digitalWrite(led_pin, HIGH);
                    digitalWrite(door_pin, HIGH);
                    ledStatus = 1;
                    Serial.println('灯亮 && 开门');
                }
            }
        }
    });
    RealHTTPClient.post(url + 'reportFan/', { "data": fanStatus }, function (status, data) {
        Serial.println(data);
        var result = JSON.parse(data);
        if (data) { // 判断服务器是否应答了
            if (result.success) {
                if (result.fanStatus == 0) {
                    customWrite(fan_pin, 0);
                    fanStatus = 0;
                    Serial.println('风扇关');
                }
                else {
                    customWrite(fan_pin, 1);
                    fanStatus = 1;
                    Serial.println('风扇开');
                }
            }
        }
    });
    var motStatus = digitalRead(mot_pin);
    if (motStatus == 1023) {
        motStatus = 1;
    } else {
        motStatus = 0;
    }
    Serial.println('运动:' + motStatus);
    RealHTTPClient.post(url + 'reportMot/', { "data": motStatus }, function (status, data) {
        if (data) { // 判断服务器是否应答了
            Serial.println(data);
        }
    });
    delay(5000);
}