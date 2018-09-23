import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from '../../store/actions/index';

import './ReminderList.css';

const ReminderList = props => {
  const { reminders, selectedDay } = props;

  let remindersList = 'No reminders...';
  if (reminders && reminders.length) {
    remindersList = reminders
      .filter(
        rem =>
          moment(rem.time).format('DD/MM/YYYY') ===
          moment(selectedDay).format('DD/MM/YYYY')
      )
      .map(reminder => (
        <li key={reminder.id}>
          <span>
            <b>{moment(reminder.time).format('HH:mm')}</b>
            {reminder.reminder}
          </span>
          <div style={{ display: 'flex' }}>
            <button
              className="btn"
              onClick={() => props.onEditReminder(reminder.id)}
            >
              Edit
            </button>
            <button
              className="btn btn--danger"
              onClick={() => props.removeReminder(reminder.id)}
            >
              x
            </button>
          </div>
        </li>
      ));
  }

  return <ul className="reminderList">{remindersList}</ul>;
};

const mapStateToProps = state => {
  return {
    reminders: state.reminder.reminders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeReminder: id => dispatch(actions.removeReminder(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReminderList);
