import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import './style.css';

export const MeetingRoom = ({ name, floor, isAvailable }: Partial<IMeetingRoom>) => <div className={`meeting-room ${isAvailable === false ? "occupied": ""}`}>
    <FontAwesomeIcon icon={faDoorOpen} fontSize={80} />
    <h4>
        {name}
    </h4>
    { floor && <div>Floor: {floor}</div>}
</div>


const MeetingRooms = ({ meetingRooms }: { meetingRooms: IMeetingRoom[] }) => <div className="meeting-rooms">
    {/* <h2>Rooms: Total {meetingRooms.length} out of which {"5"} are free</h2> */}
    <h2>Rooms</h2>
    <div className="container">
        {meetingRooms.map((meetingRoom: IMeetingRoom) => <MeetingRoom key={meetingRoom.id} name={meetingRoom.name} isAvailable={meetingRoom.isAvailable} />)}
    </div>
</div>

export default MeetingRooms;