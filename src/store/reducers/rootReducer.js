import { combineReducers } from 'redux';

import calendarReducer from './calendar';
import reminderReducer from './reminder';

const rootReducer = combineReducers({
  calendar: calendarReducer,
  reminder: reminderReducer
});

export default rootReducer;
