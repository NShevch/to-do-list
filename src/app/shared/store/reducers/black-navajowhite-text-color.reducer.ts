import { createReducer, on } from '@ngrx/store';
import { setNavajowhite, setBlack } from '../actions/black-navajowhite-text-color.actions';

export const initialState = 'black';

export const BlackNavajoWhiteTextColorReducer = createReducer(
  initialState,
  on(setNavajowhite, (state) => 'hsl(36deg 100% 84%)'),
  on(setBlack, (state) => initialState)
);
