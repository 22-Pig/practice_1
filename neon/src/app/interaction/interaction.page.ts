import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';
import { Observable } from 'rxjs';
import { Luminance } from './luminance'
import { Distance } from './distance'
import { Tab2Service } from '../services/tab2.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.page.html',
  styleUrls: ['./interaction.page.scss'],
})
export class InteractionPage implements OnInit {
  // leds$: Observable<LED>;
  luminance$: Observable<Luminance>
  distance$: Observable<Distance>
  led$ = null;
  lightValue: number;
  baseUrl = 'http://127.0.0.1:8080/';

  MAX_LIGHT_VALUE = 200;
  MIN_LIGHT_VALUE = 100;

  applicationInterval2
  applicationInterval3

  constructor(private httpclient: HttpClient, private sensors: Sensors, private tab2Service: Tab2Service) { }
  ngOnInit() {
    this.led$ = this.tab2Service.getLED();
    this.initSensor();
  }

  ngOnDestroy(): void {
    this.sensors.disableSensor()
  }

  luminance() {
    clearInterval(this.applicationInterval2)
    clearInterval(this.applicationInterval3)

    this.sensors.disableSensor()

    this.applicationInterval2 = setInterval(() => {
      this.sensors.enableSensor(TYPE_SENSOR.LIGHT)
      this.sensors.getState().then((val) => {
        this.httpclient.post(this.baseUrl + 'addLight', val).subscribe((val: any) => {
          if (val.succ) {
            console.log('addLight插入成功!')
          }
        })
      })
    }, 2000)
  }

  distance() {
    clearInterval(this.applicationInterval2)
    clearInterval(this.applicationInterval3)
    this.sensors.disableSensor()

    this.applicationInterval3 = setInterval(() => {
      this.sensors.enableSensor(TYPE_SENSOR.PROXIMITY)
      this.sensors.getState().then((val) => {
        console.log(val)
        this.httpclient.post(this.baseUrl + 'addDistance', val).subscribe((val: any) => {
          if (val.succ) {
            console.log('addDistance插入成功!')
          }
        })
      })
    }, 2000)
  }

  getLight() {
    this.luminance$ = <Observable<Luminance>>(
      this.httpclient.get(this.baseUrl + 'getLight')
    )
  }
  getDistance() {
    this.distance$ = <Observable<Distance>>(
      this.httpclient.get(this.baseUrl + 'getDistance')
    )
  }

  closeall() {
    clearInterval(this.applicationInterval2)
    clearInterval(this.applicationInterval3)
    this.sensors.disableSensor()
  }

  initSensor() {
    this.sensors.enableSensor(TYPE_SENSOR.LIGHT);
    //定时获取传感器数据
    setInterval(() => {
      this.sensors.getState().then(
        (values) => {
          console.log(values);
          this.lightValue = values[0];
          if (this.lightValue > this.MAX_LIGHT_VALUE) {
            // 太亮了,发送HTTP POST请求,关闭灯
            // 类似以下代码
            this.tab2Service.toggleLED(0).subscribe(
              () => {
                console.log('Turn off LED');
                timer(1500).subscribe(
                  () => {
                    this.led$ = this.tab2Service.getLED();
                  }
                );
              }
            );
          }
          else if (this.lightValue < this.MIN_LIGHT_VALUE) {
            // 太暗了，发送HTTP POST请求，打开灯
            this.tab2Service.toggleLED(1).subscribe(
              () => {
                console.log('Turn on LED');
                timer(1500).subscribe(
                  () => {
                    this.led$ = this.tab2Service.getLED();
                  }
                );
              }
            );
          }
          else {
            //刚好，可以保持不变。或者发送HTTP POST请求，打开一点，关闭: 点
          }
        }
      );
    }, 1000);
  }

}
