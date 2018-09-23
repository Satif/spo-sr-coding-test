import * as actionTypes from './actionTypes';
import axios from '../../axios-reminders';

export const saveReminder = (reminder, time, color) => {
  return {
    type: actionTypes.SAVE_REMINDER,
    reminder,
    time,
    color
  };
};

export const removeReminder = id => {
  return {
    type: actionTypes.REMOVE_REMINDER,
    id
  };
};

export const editReminder = (id, reminder) => {
  return {
    type: actionTypes.EDIT_REMINDER,
    id,
    reminder
  };
};

export const receiveReminderSuccess = data => {
  return {
    type: actionTypes.RECEIVE_REMINDERS_SUCCESS,
    reminders: data.data
  };
};

export const fetchData = () => {
  return dispatch => {
    axios
      .get('reminders')
      .then(res => {
        dispatch(receiveReminderSuccess(res.data));
      })
      .catch(err => {
        // TODO: Add error handling
      });
  };
};
