import * as React from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/button";
import { MeetingRoom } from "../../../components/meeting-room";
import { GET_BUILDING_BY_ID } from "../../../graphql/Query";
import { meetingRoomAvailableInBuilding } from "../../../utils";
import './styles.css';
import { ADD_MEETING } from '../../../graphql/Mutation';

const { useState } = React;

const SelectRoom = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { building, startTime, endTime, date, title } = location.state as IRoomState;
    const { loading, data, error } = useQuery(GET_BUILDING_BY_ID, {
        variables: {
            id: Number(building)
        }
    });
    const [addNewMeeting, { loading: mutationLoading, data: mutationData, error: mutationError }] = useMutation(ADD_MEETING);
    const [selectedMeetingRoomId, setMeetingRoomId] = useState(Number.MIN_SAFE_INTEGER);

    React.useEffect(()=>{
        mutationData && setTimeout(()=>{
            navigate('/');
        }, 2000);
    }, [mutationData, navigate]);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Something Went wrong please try later...</div>

    function selectAnotherBuilding() {
        navigate('/new-meeting', { state: { building, startTime, endTime, date, title } });
    }

    function getAvailableRoomsList() {
        if (!data) {
            return []
        }
        const meetingRooms = meetingRoomAvailableInBuilding(data.Building, date, startTime, endTime);
        return (meetingRooms || []).filter(meetingroom => meetingroom.isAvailable);
    }

    function submitMeeting() {
        addNewMeeting({ variables: {id: Math.round(Math.random()*100), startTime, endTime, date, meetingRoomId: selectedMeetingRoomId, title}});
    }

    const availableRoomsInBuilding = getAvailableRoomsList();

    return <div>
        {availableRoomsInBuilding?.length > 0 ?
            <div>
                <h1 className='title'>Please select one of the free rooms</h1>
                <div className="update-info">
                    {mutationLoading && <div>Adding meeting to server...</div>}
                    {mutationError && <div>Something went wrong while adding meeting. Please try later or referesh...</div>}
                    {mutationData && <div>Saved meeting redirecting to main page...</div>}
                </div>
                <div className="wrapper">
                    {availableRoomsInBuilding.map(room =>
                        <div className={`meeting-room-container ${room.id === selectedMeetingRoomId ? "selected" : ""}`} onClick={() => setMeetingRoomId(room.id)} >
                            <MeetingRoom name={room.name} floor={room.floor} isAvailable={room.isAvailable} />
                        </div>
                    )}
                </div>
                {selectedMeetingRoomId !== Number.MIN_SAFE_INTEGER ? <div className="button-wrapper"> <Button text={"Save"} onClick={submitMeeting} /> </div> : null}
            </div>
            : <div>
                <Button text={"Select Another Building or change date and time"} onClick={selectAnotherBuilding} />
                <h1>No meeting room available for the selected building</h1>
            </div>
        }
    </div>
}

export default SelectRoom;