import { createReducer, on } from '@ngrx/store';
import { setStandart, setDark } from '../actions/display.actions';

export const initialState = 'var(--color_greenGreyLight)';

export const DisplayBGColorReducer = createReducer(
  initialState,
  on(setStandart, (state) => initialState),
  on(setDark, (state) => 'hsl(224deg 14% 21%)') // hsl(167deg 74% 18%) hsl(168deg 40% 26%)
);
