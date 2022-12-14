import React from 'react';
import Navbar from '../components/Navbar';
// import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel } from '@syncfusion/ej2-react-schedule';

const Appointments = () => {
    
    return (
        <div className='appointments'>
            <img src="Untitled(1).png" alt="" className='background' />
            <Navbar />
            <h1>Mes rendez-vous</h1>
            {/* <ScheduleComponent className='schedule'>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent> */}
        </div>
    );
};

export default Appointments;