import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { Chart } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public dataSource = {
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          'Red',
          'Green',
          'purple'
        ]
      }
    ],
    labels: [] as string[],
  };

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {

  }

  ngOnInit(): void {
    Chart.register();

    this.http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {
        console.log(res);
        for (var i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
        }
        this.createChart();
      });
  }

  createChart() {
    if (isPlatformBrowser(this.platformId)) {
      const ctx = <HTMLCanvasElement>document.getElementById('myChart');
      var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
      });
    }
  }
}
