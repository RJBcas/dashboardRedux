
import { Routes } from '@angular/router';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { EstadisticasComponent } from '../ingreso-egreso/estadisticas/estadisticas.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';

export const routesDashboard: Routes = [

  {
    path: '', component: EstadisticasComponent
  },
  {
    path: 'ingreso-egresos', component: IngresoEgresoComponent
  },
  {
    path: 'detalle', component: DetalleComponent
  }

];
