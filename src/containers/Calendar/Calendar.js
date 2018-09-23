import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import CalendarHeader from '../../components/CalendarHeader/CalendarHeader';
import CalendarWeekday from '../../components/CalendarWeekday/CalendarWeekday';
import CalendarDay from '../../components/CalendarDay/CalendarDay';
import Modal from '../../components/UI/Modal/Modal';
import Reminder from '../Reminder/Reminder';

class Calendar extends Component {
  state = {
    modalOpen: false
  };

  onDateClicked = day => {
    this.props.onDaySelect(day);

    this.setState({
      modalOpen: true
    });
  };

  reminderCancelHandler = () => {
    // TODO: Add clear form after modal closed
    this.setState({
      modalOpen: false
    });
  };

  render() {
    return (
      <div className="calendar">
        <Modal
          modalClosed={this.reminderCancelHandler}
          show={this.state.modalOpen}
        >
          <Reminder
            selectedDay={this.props.selectedDay}
            modalClosed={this.reminderCancelHandler}
          />
        </Modal>

        <CalendarHeader />
        <div className="calendar-body">
          <CalendarWeekday />
          <CalendarDay
            selectDay={this.onDateClicked}
            currentMonth={this.props.currentMonth}
            selectedDate={this.props.selectedDate}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentMonth: state.calendar.currentMonth,
    selectedDay: state.calendar.selectedDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDaySelect: selectedDay => dispatch(actions.selectDate(selectedDay))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
