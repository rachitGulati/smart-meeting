import './style.css';

const Meetings = ({meetingsMeta}: {meetingsMeta: IMeetingMeta}) => <div className="meetings">
    <h2>Meetings:</h2>
    <p>{
        meetingsMeta.todayMeetingCount > 0 ?
            `Total ${meetingsMeta.todayMeetingCount} meeting(s) today ${meetingsMeta.onGoingMeetingCount > 0 ? `and ${meetingsMeta.onGoingMeetingCount} meeting(s) currently going on` : ""}` :
            "No meeting today"}</p>
</div>

export default Meetings;