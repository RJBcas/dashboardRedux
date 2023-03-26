import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';

export const setUser = createAction('[AUTH] SetUser',
  props<{ user: Usuario }>())

export const unSetUser = createAction('[AUTH] unSetUser');
