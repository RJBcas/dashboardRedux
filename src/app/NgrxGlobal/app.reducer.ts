import { ActionReducerMap } from "@ngrx/store";
import * as ui from '../share/NgRxjs/ui.reducer'
import * as auth from '../auth/ngrxj/auth.reducer'
import * as ingresoEgreso from '../ingreso-egreso/ngrxjs/ingresoEgreso.reducer'


export interface AppState {
  ui: ui.State
  user: auth.State,
  ingresosEgresos: ingresoEgreso.State
}


export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  ingresosEgresos: ingresoEgreso.ingresoEgresoReducer
}
