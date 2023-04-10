import { createReducer, on } from '@ngrx/store';
import { alertMsg, resetMsg } from '../actions/alert.action';

export const initialState = 'Wooooooooow';

export const alertReducer = createReducer(
  initialState,
  on(alertMsg, (state, { Message }) => Message),
  on(resetMsg, (state) => '')
);
