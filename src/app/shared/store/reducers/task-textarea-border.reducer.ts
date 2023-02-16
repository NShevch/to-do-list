import { createReducer, on } from '@ngrx/store';
import { set, unset } from '../actions/task-textarea-border.actions';

export const initialState = 'none';

export const TaskTextareaBorderReducer = createReducer(
  initialState,
  on(set, (state) => '2px solid hsl(224deg 14% 21% / 50%)'),
  on(unset, (state) => initialState)
);
