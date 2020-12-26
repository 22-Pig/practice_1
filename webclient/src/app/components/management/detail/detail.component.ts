import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Observable, timer } from 'rxjs';
import { DetailService } from '../../../services/detail.service';

import { HttpClient } from '@angular/common/http';
import { Display } from './Display';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  isLoading = false;

  led$ = null;
  fan$ = null;
  mot$ = null;
  displayTemp$: Observable<Display>;
  displayHumd$: Observable<Display>;
  displayLed$: Observable<Display>;
  baseUrl = 'http://127.0.0.1:8080/';

  chartOptionTemp: any;
  updateOptionTemp: any;

  chartOptionHumd: any;
  updateOptionHumd: any;

  chartOptionSmoke: any;
  updateOptionSmoke: any;

  public xAxisTemp = [];
  public xAxisHumd = [];
  public xAxisSmoke = [];

  public temps = [];
  public humds = [];
  public smokes = [];

  type = new Map([
    ['temp', 'temp'],
    ['humd', 'humd'],
    ['led', 'led'],
  ]);

  constructor(private detailService: DetailService, private httpclient: HttpClient) {
    this.chartOptionTemp = {
      title: {
        text: '温度跟踪图'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['温度']
      },
      toolbox: {
        feature: {
          saveAsImage: {
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundarGap: false,
          data: [],
          name: 'time'
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '温度',
          type: 'line',
          stack: '度',
          // areaStyle: { normal: {} },
          data: [],
          color: ['#FF6347'],
          smooth: true
        }
      ]
    };

    this.updateOptionTemp = {};

    this.chartOptionHumd = {
      title: {
        text: '湿度跟踪图'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['湿度']
      },
      toolbox: {
        feature: {
          saveAsImage: {
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundarGap: false,
          data: [],
          name: 'time'
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '湿度',
          type: 'line',
          stack: '%',
          // areaStyle: { normal: {} },
          data: [],
          color: ['#1E90FF'],
          smooth: true
        }
      ]
    };

    this.updateOptionHumd = {};

    this.chartOptionSmoke = {
      title: {
        text: '烟雾跟踪图'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['烟雾']
      },
      toolbox: {
        feature: {
          saveAsImage: {
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundarGap: false,
          data: [],
          name: 'time'
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '烟雾',
          type: 'line',
          stack: '毫克',
          data: [],
          color: ['#BEBEBE'],
          smooth: true
        }
      ]
    };

    this.updateOptionSmoke = {};

  }

  ngOnInit(): void {
    this.led$ = this.detailService.getLED();
    this.fan$ = this.detailService.getFAN();

    this.search();

    timer(2000, 2000).subscribe(
      () => {
        this.httpclient.get('http://127.0.0.1:8080/temp/002', {}).subscribe(
          (value: any) => {
            // console.log(value);
            if (value) {
              let i = value.length - 1;
              for (let item of value) {
                const d = new Date(Number(item.time));
                // console.log(d);
                this.xAxisTemp[i] = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
                this.xAxisTemp[i] += ":" + (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes());
                this.xAxisTemp[i] += ":" + (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds());
                // console.log(item.temp);
                this.temps[i] = (item.temp);
                i--;
              }
              this.updateOptionTemp = {
                xAxis: [
                  {
                    data: this.xAxisTemp
                  }
                ],
                series: [
                  {
                    data: this.temps
                  }
                ]
              }
            }
          }
        ),
          this.httpclient.get('http://127.0.0.1:8080/humd/001', {}).subscribe(
            (value: any) => {
              // console.log(value);
              if (value) {
                let i = value.length - 1;
                for (let item of value) {
                  const d = new Date(Number(item.time));
                  this.xAxisHumd[i] = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
                  this.xAxisHumd[i] += ":" + (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes());
                  this.xAxisHumd[i] += ":" + (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds());
                  this.humds[i] = (item.humd);
                  i--;
                }
                this.updateOptionHumd = {
                  xAxis: [
                    {
                      data: this.xAxisHumd
                    }
                  ],
                  series: [
                    {
                      data: this.humds
                    }
                  ]
                }
              }
            }
          ),
          this.httpclient.get('http://127.0.0.1:8080/smoke/003', {}).subscribe(
            (value: any) => {
              if (value) {
                let i = value.length - 1;
                for (let item of value) {
                  const d = new Date(Number(item.time));
                  this.xAxisSmoke[i] = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
                  this.xAxisSmoke[i] += ":" + (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes());
                  this.xAxisSmoke[i] += ":" + (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds());
                  this.smokes[i] = (item.smoke);
                  i--;
                }
                this.updateOptionSmoke = {
                  xAxis: [
                    {
                      data: this.xAxisSmoke
                    }
                  ],
                  series: [
                    {
                      data: this.smokes
                    }
                  ]
                }
              }
            }
          )

      }
    );

    setInterval(() => {
      this.mot$ = this.detailService.getMOT();
      this.led$ = this.detailService.getLED();
      this.fan$ = this.detailService.getFAN();
    }, 5000)
  }



  click() {
    this.led$ = this.detailService.getLED();
    this.fan$ = this.detailService.getFAN();
    console.log(this.led$);
    console.log(this.fan$);
    /* this.mot$ = this.httpclient.get('http://127.0.0.1:8080/getMot/003', {}).subscribe(
      (value: any) => {
        console.log(value);
      }
    ) */
    this.mot$ = this.detailService.getMOT();
  }
  // 开灯
  turnOn() {
    this.detailService.toggleLED(1).subscribe(
      () => {
        console.log('Turn on LED');
        timer(1500).subscribe(
          () => {
            this.led$ = this.detailService.getLED();
          }
        );
      }
    );
  }
  // 关灯
  turnOff() {
    this.detailService.toggleLED(0).subscribe(
      () => {
        console.log('Turn off LED');
        timer(1500).subscribe(
          () => {
            this.led$ = this.detailService.getLED();
          }
        );
      }
    );
  }
  // 开风扇
  turnOnFan() {
    this.detailService.toggleFAN(1).subscribe(
      () => {
        console.log('Turn on FAN');
        timer(1500).subscribe(
          () => {
            this.fan$ = this.detailService.getFAN();
          }
        );
      }
    );
  }
  // 关风扇
  turnOffFan() {
    this.detailService.toggleFAN(0).subscribe(
      () => {
        console.log('Turn off FAN');
        timer(1500).subscribe(
          () => {
            this.fan$ = this.detailService.getFAN();
          }
        );
      }
    );
  }


  displayList(type: string): string {
    if (this.type.get(type)) {
      return this.type.get(type);
    }
    return 'xxx';
  }

  search() {
    this.displayTemp$ = <Observable<Display>>this.httpclient.get(this.baseUrl + 'displayTemp');
    this.displayHumd$ = <Observable<Display>>this.httpclient.get(this.baseUrl + 'displayHumd');
    this.displayLed$ = <Observable<Display>>this.httpclient.get(this.baseUrl + 'displayLed');
  }




}
