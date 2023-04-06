import { createReducer, on } from '@ngrx/store';
import { IngresosEgresos } from 'src/app/models/ingresos-egresos.model';
import * as actions from './ingresoEgreso.actions';

export interface State {
  items: IngresosEgresos[] | null
}


export const initialState: State = {
  items: null
};



export const ingresoEgresoReducer = createReducer(
  initialState,
  on(actions.setItem, (state, { items }) => ({ ...state, items: [...items] })),
  on(actions.unSetItem, (state) => ({ ...state, items: null }))
);
