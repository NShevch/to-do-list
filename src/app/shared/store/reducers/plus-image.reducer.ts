import { createReducer, on } from '@ngrx/store';
import { setAqua, setBlack } from '../actions/plus-image.actions';

export const initialState = './assets/images/add2.png';

export const PlusImageReducer = createReducer(
  initialState,
  on(setAqua, (state) => './assets/images/add2_aqua.png'),
  on(setBlack, (state) => initialState)
);
