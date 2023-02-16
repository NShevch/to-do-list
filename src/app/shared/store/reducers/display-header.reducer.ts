import { createReducer, on } from '@ngrx/store';
import { setStandart, setDark } from '../actions/display-header.actions';

export const initialState = 'var(--color_greenGreyDark)';

export const DisplayHeaderBGColorReducer = createReducer(
  initialState,
  on(setStandart, (state) => initialState),
  on(setDark, (state) => 'hsl(222deg 13% 15%)') // hsl(0deg 0% 17%)
);
