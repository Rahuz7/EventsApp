import React, { Component } from 'react';
import '../styles/home.css';
import EventDescription from './eventDescription.component';
import EventList from './eventList.component'; 

const EventCalendar = () => {
        return (
            <div>
                <EventDescription />
                <EventList />
            </div>
        )
    }

export default EventCalendar