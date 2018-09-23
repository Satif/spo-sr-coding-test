import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import { updateObject } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import ReminderList from '../../components/ReminderList/ReminderList';

import 'react-datepicker/dist/react-datepicker.css';
import './Reminder.css';

class Reminder extends Component {
  state = {
    form: {
      reminder: {
        value: '',
        rules: {
          maxLength: 30
        }
      },
      time: {
        value: '',
        rules: null
      },
      color: {
        value: '',
        rules: null
      }
    },
    isEdit: false,
    selectedReminderId: null
  };

  componentDidMount() {
    this.props.fetchReminders();
    this.defaultState = { ...this.state };
  }

  onInputChange = (event, dateInput) => {
    // Check if it is datepicker or simple input
    let inputValue = event && event === 'time' ? dateInput : event.target.value;

    let stateInputName = event && event === 'time' ? event : event.target.name;

    const updatedInput = updateObject(this.state.form[stateInputName], {
      value: inputValue
    });

    // TODO: Fix validation. Add errors
    // let validity = checkValidity(e.target.value, this.state.reminder.rules);

    this.setState({
      form: {
        ...this.state.form, // TODO: CHECK
        [stateInputName]: updatedInput
      }
    });
  };

  formSubmit = e => {
    e.preventDefault();
    const { reminder, color } = this.state.form;

    if (!reminder.value.trim().length) return false;

    // TODO: Refactor this
    if (this.state.isEdit) {
      const updatedReminder = {
        reminder: reminder.value,
        time: this.props.selectedDay,
        color: color.value
      };
      this.props.editReminder(this.state.selectedReminderId, updatedReminder);
    } else {
      // TODO: Temporary added time from props. Need to be refactored
      this.props.saveReminder(
        reminder.value,
        this.props.selectedDay,
        color.value
      );
    }

    this.props.modalClosed();

    // Clear form
    this.setState(this.defaultState);
  };

  editReminderHandler = id => {
    const selectedReminder = this.props.reminders.find(el => el.id === id);
    const { reminder, time, color } = selectedReminder;

    const updatedForm = updateObject(this.state.form, {
      reminder: updateObject(this.state.form.reminder, {
        value: reminder
      }),
      time: updateObject(this.state.form.time, {
        value: this.props.selectedDay
      }),
      color: updateObject(this.state.form.color, {
        value: color
      })
    });

    this.setState({
      form: updatedForm,
      isEdit: true,
      selectedReminderId: id
    });

    this.props.onDaySelect(time);
  };

  render() {
    let { reminder, color } = this.state.form;
    let { isEdit } = this.state;

    return (
      <React.Fragment>
        <form className="reminder" onSubmit={this.formSubmit} ref="form">
          <h2>Add Reminder</h2>
          <textarea
            name="reminder"
            value={reminder.value}
            maxLength={reminder.rules.maxLength}
            onChange={this.onInputChange}
            placeholder="Your reminder..."
          />
          <div className="reminder-date">
            <DatePicker
              name="time"
              onChange={this.props.onDaySelect}
              selected={this.props.selectedDay}
              popperPlacement="top"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="LLL"
              timeCaption="time"
            />
          </div>
          <div className="reminder-colors">
            <div className="reminder-colors-color">
              <label className="reminder-colors-color--blue">
                {/* TODO: Move input to separate component */}
                <input
                  name="color"
                  onChange={this.onInputChange}
                  type="radio"
                  value="blue"
                  checked={color.value === 'blue'}
                />
                Blue
              </label>
            </div>
            <div className="reminder-colors-color">
              <label className="reminder-colors-color--red">
                {/* TODO: Move input to separate component */}
                <input
                  name="color"
                  onChange={this.onInputChange}
                  type="radio"
                  value="red"
                  checked={color.value === 'red'}
                />
                Red
              </label>
            </div>
          </div>

          {/* TODO: Move button to separate component */}
          <button
            type="button"
            className="btn btn-form btn--close btn--danger"
            onClick={this.props.modalClosed}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-form btn--success">
            {isEdit ? 'Update' : 'Save'}
          </button>
        </form>

        <ReminderList
          onEditReminder={this.editReminderHandler}
          selectedDay={this.props.selectedDay}
        />
      </React.Fragment>
    );
  }
}

// TODO: Add prop types

const mapStateToProps = state => {
  return {
    selectedReminder: state.reminder.selectedReminder,
    reminders: state.reminder.reminders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveReminder: (reminder, time, color) =>
      dispatch(actions.saveReminder(reminder, time, color)),
    onDaySelect: selectedDay => dispatch(actions.selectDate(selectedDay)),
    editReminder: (id, updatedReminder) =>
      dispatch(actions.editReminder(id, updatedReminder)),
    fetchReminders: () => dispatch(actions.fetchData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reminder);
