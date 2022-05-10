### How to run project
`yarn install && yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000. to view it in the browser.


### Functional Requirements
1. First page should show info about Buildings, Meeting Rooms and Meetings (Refer
Mock UI)
2. User should be able to click on Add meeting button and move on to second page
where it can take relevant inputs to add a meeting. Inputs such as Date, Start and
End time, Building etc. (refer mock UI)
3. On clicking next, show user the list of meeting rooms in that building. User will select
a meeting room and confirms the booking by clicking on ‘Save’ button.
4. [Optional – good too have] Show only available meeting rooms (from step 3) for the
specified date and time (from step 2).


### Non Functional Requirements
1. Should auto fetch and update meeting rooms and building. (This will update whole application state to server state)
2. Auto update existing UI with some interval fashion based on data available for the meeting rooms in first fetch (This will only update client state)
3. Proper validation for form submission.


### Interfaces to interact within the application

```
interface IBuilding {
    id: number;
    name: string;
    meetingRooms?: IMeetingRoom[];
}

interface IMeeting {
    id: number;
    title?: string;
    date: string;
    startTime: string;
    endTime: string;
    meetingRoom?: IMeetingRoom
}

interface IMeetingRoom {
    id: number;
    name: string;
    floor?: number;
    building?: IBuilding
    meetings?: IMeeting[];
    isAvailable?: boolean;
}

interface IRoomState {
    building: string;
    startTime: string;
    endTime: string;
    date: string;
    title: string;
}
interface IMeetingMeta {
    todayMeetingCount: number;
    onGoingMeetingCount: number;
};

interface IAppData { 
    buildings: IBuilding[],
    meetingRooms: IMeetingRoom[],
    meetingsMeta: IMeetingMeta,
};
```
Mutations:

### Add a meeting in meeting room

```
mutation {

    Meeting(
      id: 1
      title: "Test Booking"
      date: "05/10/2022"
      startTime: "00:00"
      endTime: "01:00"
      meetingRoomId: 1
    ) {
      id
      title
    }
  }
```

### Add meetingroom in building
```
mutation {
  MeetingRoom(
    id: 10
    name: "Testing 1"
    floor: 2
    buildingId: 2
  ) {
    id
    name
  }
}
```