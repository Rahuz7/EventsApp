import React, { Component } from 'react';
import '../styles/home.css';
import EventDescription from './eventDescription.component';
import EventList from './eventList.component'; 

const EventCalendar = ({ activerFonctionC } ) => {
        return (
            <div>
                <EventDescription />
                <EventList activerFonctionC={activerFonctionC} />
            </div>
        )
    }

export default EventCalendar