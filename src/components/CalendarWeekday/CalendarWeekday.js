import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

import './CalendarWeekday.css';

const CalendarWeekday = () => {
  let weekDays = [];

  // Generate days of week
  for (let i = 0; i < 7; i++) {
    weekDays.push(
      moment()
        .week(i)
        .startOf('week')
        .clone()
        .add(i, 'day')
    );
  }

  return (
    <div className="calendar-weekday">
      {weekDays.map(day => (
        <div key={day} className="calendar-weekday-day">
          <Moment date={day} format="ddd" />
        </div>
      ))}
    </div>
  );
};

export default CalendarWeekday;
