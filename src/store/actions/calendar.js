import * as actionTypes from './actionTypes';

export const nextMonth = () => {
  return {
    type: actionTypes.NEXT_MONTH
  };
};

export const prevMonth = () => {
  return {
    type: actionTypes.PREV_MONTH
  };
};

export const selectDate = selectedDay => {
  return {
    type: actionTypes.SELECT_DATE,
    selectedDate: selectedDay
  };
};
