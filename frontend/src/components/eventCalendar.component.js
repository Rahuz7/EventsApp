import React, { Component } from 'react';
import '../styles/home.css';
// import '../styles/eventDescription.css';
import EventDescription from './eventDescription.component';
import EventList from './eventList.component'; 

export default class EventCalendar extends Component {

    render() {
        return (
            <div>
                <EventDescription />
                <EventList />
            </div>
        )
    }
}