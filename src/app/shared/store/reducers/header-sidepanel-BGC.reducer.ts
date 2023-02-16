import { createReducer, on } from '@ngrx/store';
import { setWhite, setDark } from '../actions/header-sidepanel-BGC.actions';

export const initialState = 'white';

export const HeaderSidePanelBGColorReducer = createReducer(
  initialState,
  on(setWhite, (state) => initialState),
  on(setDark, (state) => 'hsl(222deg 14% 18%)') //hsl(175deg 15% 16%) hsl(0deg 0% 31%)
);
