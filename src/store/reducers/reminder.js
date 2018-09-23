import * as actionTypes from '../actions/actionTypes';
import moment from 'moment';
import { updateObject } from '../../shared/utility';

const initialState = {
  reminders: [],
  selectedReminder: null
};

const saveReminder = (state, action) => {
  const newReminder = {
    id: moment().unix(),
    color: action.color,
    reminder: action.reminder,
    time: action.time
  };

  return updateObject(state, {
    reminders: state.reminders.concat(newReminder)
  });
};

const removeReminder = (state, action) => {
  return updateObject(state, {
    reminders: state.reminders.filter(reminder => reminder.id !== action.id)
  });
};

const editReminder = (state, action) => {
  return updateObject(state, {
    reminders: state.reminders.map(
      el => (el.id === action.id ? { ...el, ...action.reminder } : el)
    )
  });
};

const receiveReminderSuccess = (state, action) => {
  return updateObject(state, {
    reminders: action.reminders
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_REMINDER:
      return saveReminder(state, action);
    case actionTypes.REMOVE_REMINDER:
      return removeReminder(state, action);
    case actionTypes.EDIT_REMINDER:
      return editReminder(state, action);
    case actionTypes.RECEIVE_REMINDERS_SUCCESS:
      return receiveReminderSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
