import { createAction, props } from '@ngrx/store';
import { IngresosEgresos } from 'src/app/models/ingresos-egresos.model';

export const unSetItem = createAction('[IngresoEgreso] unSetItem');
export const setItem = createAction('[IngresoEgreso] SetItems',
  props<{ items: IngresosEgresos[] }>())
