import { createReducer, on } from '@ngrx/store';
import { setWhite, setDark } from '../actions/loop-image.actions';

export const initialState = 'url(./assets/images/loop.png)';

export const LoopImageReducer = createReducer(
  initialState,
  on(setWhite, (state) => 'url(./assets/images/loop_white.png)'),
  on(setDark, (state) => initialState)
);
