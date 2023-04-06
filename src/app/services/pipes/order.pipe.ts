import { Pipe, PipeTransform } from '@angular/core';
import { IIngresosEgresos } from 'src/app/models/ingresos-egresos.model';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(items: IIngresosEgresos[]): IIngresosEgresos[] {
    console.log(items)
    return [...items].sort((a, b) => {
      if (a.tipo === 'ingreso ') {
        return -1
      } else {
        return 1
      }
    });

  }

}
