import { createReducer, on } from '@ngrx/store';
import { setAqua, setBlack } from '../actions/black-aqua-text-color.actions';

export const initialState = 'black';

export const BlackAquaTextColorReducer = createReducer(
  initialState,
  on(setAqua, (state) => 'var(--color_aqua)'),
  on(setBlack, (state) => initialState)
);
