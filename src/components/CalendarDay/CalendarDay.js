import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import classnames from 'classnames';

import moment from 'moment';

import './CalendarDay.css';

class CalendarDay extends Component {
  render() {
    const { currentMonth } = this.props.calendar;
    let remindersList = this.props.reminder.reminders;

    let startMonthDay = moment(currentMonth).startOf('month');
    let startDay = moment(currentMonth)
      .startOf('month')
      .startOf('week');
    let endDay = moment(currentMonth)
      .endOf('month')
      .endOf('week');
    let days = [];

    while (startDay.isBefore(endDay, 'day')) {
      let classes = classnames('calendar-days-day', {
        disabled: !moment(startDay).isSame(startMonthDay, 'month')
      });
      const currentDate = startDay;

      // TODO: Need to refactor this
      let reminders = remindersList
        .filter(
          rem =>
            moment(rem.time).format('DD/MM/YYYY') ===
            moment(startDay).format('DD/MM/YYYY')
        )
        .sort((a, b) => moment(a.time) - moment(b.time))
        .map(el => (
          <div
            key={el.reminder}
            className={classnames('calendar-days-reminder', el.color)}
          >
            <span>
              <Moment date={el.time} format="HH:mm" />
            </span>
            {el.reminder}
          </div>
        ));

      days.push(
        <div
          className={classes}
          key={startDay}
          onClick={() => this.props.selectDay(currentDate)}
        >
          <span className="calendar-days-date">{startDay.format('D')}</span>

          {reminders}
        </div>
      );

      startDay = moment(startDay).add(1, 'day');
    }

    return <div className="calendar-days">{days}</div>;
  }
}

const mapStateToProps = state => {
  return {
    calendar: state.calendar,
    reminder: state.reminder
  };
};

export default connect(mapStateToProps)(CalendarDay);
