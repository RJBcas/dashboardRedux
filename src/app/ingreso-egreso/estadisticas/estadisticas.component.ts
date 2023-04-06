import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/NgrxGlobal/app.reducer';
import { IIngresosEgresos, IngresosEgresos } from 'src/app/models/ingresos-egresos.model';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  ingresos: number = 0;
  egresos: number = 0;
  totalIngresos: number = 0;
  totalEgresos: number = 0;
  unSuscribe: Subscription;
  // chart.js

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [0, 0] },

    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppState>) {
    this.unSuscribe = Subscription.EMPTY;
  }
  ngOnInit(): void {
    this.unSuscribe = this.store.select('ingresosEgresos')
      .subscribe(({ items }) => this.generarEstadisticas(items))
  }

  generarEstadisticas(items: any) {
    this.totalIngresos = 0;
    this.totalEgresos = 0;

    if (items !== null) {
      for (const item of items) {
        if (item.tipo === 'ingreso') {
          this.totalIngresos += item.monto;
          this.ingresos++;
        } else {
          this.totalEgresos += item.monto;
          this.egresos++;
        }
      }

      console.log(this.ingresos, this.totalIngresos, this.egresos, this.totalEgresos)
      this.doughnutChartData.datasets = [{ data: [this.totalIngresos, this.totalEgresos] }]
    }
  }

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
