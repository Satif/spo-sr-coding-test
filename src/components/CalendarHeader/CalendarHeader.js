import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import * as actions from '../../store/actions/index';

import './CalendarHeader.css';

const CalendarHeader = props => {
  return (
    <div className="calendar-header">
      <button className="btn" onClick={props.prevMonthClicked}>
        Prev Month
      </button>

      <div className="calendar-header-month">
        <Moment format="MMMM YYYY" date={props.currentMonth} />
      </div>

      <button className="btn" onClick={props.nextMonthClicked}>
        Next Month
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentMonth: state.calendar.currentMonth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    nextMonthClicked: () => dispatch(actions.nextMonth()),
    prevMonthClicked: () => dispatch(actions.prevMonth())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarHeader);
