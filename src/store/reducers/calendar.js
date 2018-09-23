import * as actionTypes from '../actions/actionTypes';
import moment from 'moment';

import { updateObject } from '../../shared/utility';

const initialState = {
  currentMonth: moment(),
  selectedDate: moment()
};

const nextMonth = (state, action) => {
  return updateObject(state, {
    currentMonth: moment(state.currentMonth).add(1, 'months')
  });
};
const prevMonth = (state, action) => {
  return updateObject(state, {
    currentMonth: moment(state.currentMonth).subtract(1, 'month')
  });
};
const selectDate = (state, action) => {
  return updateObject(state, {
    selectedDate: action.selectedDate
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEXT_MONTH:
      return nextMonth(state, action);
    case actionTypes.PREV_MONTH:
      return prevMonth(state, action);
    case actionTypes.SELECT_DATE:
      return selectDate(state, action);
    default:
      return state;
  }
};

export default reducer;
