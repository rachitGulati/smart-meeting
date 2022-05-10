import * as React from 'react';
import { Link } from 'react-router-dom';
import Buildings from '../../components/building';
import MeetingRooms from '../../components/meeting-room';
import Meetings from '../../components/meetings';
import './styles.css';
import Button from '../../components/button';
import useAppState from '../../hooks/use-app-state';

const Home = () => {
  const {buildings, meetingRooms, meetingsMeta, loading, error } = useAppState();
  if(loading && !buildings) return <div>Loading...</div>
  if(error) return <div>Something Went wrong please try later...</div>
  
  
  return (
    <div className="app">
      <div className="new-meeting">
          <Link to="new-meeting">
            <Button text={"Add a Meeting"}></Button>
          </Link>
      </div>
      <Buildings buildings={buildings} />
      <MeetingRooms meetingRooms={meetingRooms} />
      <Meetings meetingsMeta={meetingsMeta} />
    </div>
  );
}

export default Home;
