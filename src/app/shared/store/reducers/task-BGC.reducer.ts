import { createReducer, on } from '@ngrx/store';
import { setStandart, setDark } from '../actions/task-BGC.actions';

export const initialState = 'white';

export const TaskBGColorReducer = createReducer(
  initialState,
  on(setStandart, (state) => initialState),
  on(setDark, (state) => 'hsl(0deg 0% 0% / 30%)')
);
//hsl(0deg 0% 0% / 25%) dark
//hsl(0deg 0% 97% / 44%)
//hsl(222deg 14% 18% / 77%)
//hsl(0deg 0% 0% / 50%)
//hsl(0 0% 100% / 0.62)
//hsl(0deg 0% 17%)
//hsl(0deg 0% 17% / 91%
//hsl(0deg 0% 0% / 60%)