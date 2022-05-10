import { useQuery } from '@apollo/client';
import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import { GET_ALL_BUILDINGS } from '../../graphql/Query';
import './styles.css';

const { useState } = React;

function convertTimeToMinutes(time: string) {
    const [hours, minutes]: number[] = time.split(":").map(Number);

    return (hours * 60) + minutes;
}

const DEFAULT_ERROR_STATE = {
    title: { hasError: false, message: '' },
    date: { hasError: false, message: '' },
    startTime: { hasError: false, message: '' },
    endTime: { hasError: false, message: '' },
    building: { hasError: false, message: '' }
};

const DetailsForm = () => {
    const location = useLocation();
    const { date: dateFromRoute, startTime: startTimeFromRoute, endTime: endTimeFromRoute, building: buildingFromRoute, title: titleFromRoute } = location.state as IRoomState || {};
    let formatedDate = dateFromRoute;
    if(dateFromRoute){
        const [day, month, year] = dateFromRoute.split('/');
        formatedDate = [year, month, day].join('-');

    }
    const [date, setDate] = useState(formatedDate || '');
    const [startTime, setStartTime] = useState(startTimeFromRoute || '');
    const [endTime, setEndTime] = useState(endTimeFromRoute || '');
    const [building, setBuilding] = useState(buildingFromRoute || '');
    const [title, setTitle] = useState(titleFromRoute || '');
    const [error, setError] = useState(DEFAULT_ERROR_STATE);
    const navigate = useNavigate();

    const { data } = useQuery(GET_ALL_BUILDINGS);

    function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        setError(DEFAULT_ERROR_STATE);
        setTitle(e.target.value);
    }

    function changeDate(e: React.ChangeEvent<HTMLInputElement>) {
        setError(DEFAULT_ERROR_STATE);
        setDate(e.target.value);
    }

    function changeStartTime(e: React.ChangeEvent<HTMLInputElement>) {
        setError(DEFAULT_ERROR_STATE);
        setStartTime(e.target.value);
    }

    function changeEndTime(e: React.ChangeEvent<HTMLInputElement>) {
        setError(DEFAULT_ERROR_STATE);
        setEndTime(e.target.value);
    }


    function changeBuilding(e: React.ChangeEvent<HTMLSelectElement>) {
        setError(DEFAULT_ERROR_STATE);
        setBuilding(e.target.value);
    }

    function submitForm(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();

        if (title.trim() === '') {
            setError({ ...error, title: { hasError: true, message: "Please enter title" } })
            return;
        }

        if (date === '') {
            setError({ ...error, date: { hasError: true, message: "Please select date" } })
            return;
        }

        if (startTime === '') {
            setError({ ...error, startTime: { hasError: true, message: "Please select startTime" } })
            return;
        }

        if (endTime === '') {
            setError({ ...error, endTime: { hasError: true, message: "Please select endTime" } })
            return;
        }

        if (building === '') {
            setError({ ...error, building: { hasError: true, message: "Please select building" } })
            return;
        }

        const startTimeInMinutes = convertTimeToMinutes(startTime);
        const endTimeInMinutes = convertTimeToMinutes(endTime);

        if (startTimeInMinutes > endTimeInMinutes) {
            setError({ ...error, endTime: { hasError: true, message: "EndTime should be greator than Start time" } })
            return;
        }
        const [year, month, day] = date.split('-');
        const dateInFormat = [day, month, year].join('/');
        navigate('select-room', { state: { building, startTime, endTime, date: dateInFormat, title } as IRoomState });
    }

    return <div>
        <form >
            <fieldset>
                <label htmlFor="title">Title:</label>
                <div className='input-container'>
                    <input className={error.title.hasError ? "has-error" : ""} type="text" name="title" value={title} onChange={changeTitle} />
                    {error.title.hasError && <div className='error'> {error.title.message}</div>}
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="date">Date:</label>
                <div className='input-container'>
                    <input className={error.date.hasError ? "has-error" : ""} type="date" name="date" value={date} onChange={changeDate} />
                    {error.date.hasError && <div className='error'> {error.date.message}</div>}
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="startTime">StartTime:</label>
                <div className='input-container'>
                    <input className={error.startTime.hasError ? "has-error" : ""} type="time" name="startTime" value={startTime} onChange={changeStartTime} />
                    {error.startTime.hasError && <div className='error'> {error.startTime.message}</div>}
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="endTime">EndTime:</label>
                <div className='input-container'>
                    <input className={error.endTime.hasError ? "has-error" : ""} type="time" name="endTime" value={endTime} onChange={changeEndTime} />
                    {error.endTime.hasError && <div className='error'> {error.endTime.message}</div>}
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="building">Building:</label>
                <div className='input-container'>
                    <select className={error.building.hasError ? "has-error" : ""} name="building" value={building} onChange={changeBuilding}>
                        <option value={''}>Select Building</option>
                        {(data?.Buildings || []).map((building: IBuilding) => <option key={building.id} value={building.id}>{building.name}</option>)}
                    </select>
                    {error.building.hasError && <div className='error'> {error.building.message}</div>}
                </div>
            </fieldset>
            <fieldset>
                <Button onClick={submitForm} text={"Next"}></Button>
            </fieldset>
        </form>
    </div>
}

export default DetailsForm;