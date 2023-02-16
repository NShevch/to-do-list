import { HeaderSidePanelBGColorReducer } from './reducers/header-sidepanel-BGC.reducer';
import { BlackAquaTextColorReducer } from './reducers/black-aqua-text-color.reducer';
import { DisplayHeaderBGColorReducer } from './reducers/display-header.reducer';
import { DisplayBGColorReducer } from './reducers/display.reducer';
import { TaskBGColorReducer } from './reducers/task-BGC.reducer';
import { BlackNavajoWhiteTextColorReducer } from './reducers/black-navajowhite-text-color.reducer';
import { TaskTextareaBorderReducer } from './reducers/task-textarea-border.reducer';
import { LoopImageReducer } from './reducers/loop-image.reducer';
import { PlusImageReducer } from './reducers/plus-image.reducer';


export const reducers = {
  headerSidePanelBGColor: HeaderSidePanelBGColorReducer,
  blackAquaTextColor: BlackAquaTextColorReducer,
  displayBGColor: DisplayBGColorReducer,
  displayHeaderBGColor: DisplayHeaderBGColorReducer,
  taskBGColor: TaskBGColorReducer,
  blackNavajowhiteTextColor: BlackNavajoWhiteTextColorReducer,
  taskTextareaBorder: TaskTextareaBorderReducer,
  loopImage: LoopImageReducer,
  plusImage: PlusImageReducer,
};