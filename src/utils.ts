function todayDate(){
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = today.getMonth() + 1; // Months start at 0!
    const dd = today.getDate();
  
    const todayDate = `${dd < 10 ? "0" + dd : dd}/${mm < 10 ? "0" + mm : mm}/${yyyy}`;
    return todayDate
}

function convertDateAndTimeToEpoc(date: string, startTime: string, endTime: string){
    const [day, month, year] = date.split('/');
    const formatedDate = [month, day,year].join('/');
    const startTimeEpoc = new Date(`${formatedDate} ${startTime}`).getTime();
    const endTimeEpoc = new Date(`${formatedDate} ${endTime}`).getTime();
    return {startTimeEpoc, endTimeEpoc};
}

export const mapServerDataToClientFormat = (buildings: IBuilding[]): IAppData => {
    const initialData: IAppData =  { buildings: [], meetingRooms: [], meetingsMeta: { todayMeetingCount: 0, onGoingMeetingCount: 0}};
    return buildings.reduce(({buildings, meetingRooms, meetingsMeta}: IAppData, building: IBuilding)=>{
        const { name, id, meetingRooms: buildingMeetingRooms} = building;
        buildingMeetingRooms?.map((meetingRoom) => {
          const { id, name, floor, meetings: roomMeetings} = meetingRoom
          let isAvailable = true;
          let nowEpoc = Date.now();
          roomMeetings?.forEach((meeting) => {
            const {date, startTime, endTime} = meeting;
            const { startTimeEpoc, endTimeEpoc} = convertDateAndTimeToEpoc(date, startTime, endTime);
            if(nowEpoc >= startTimeEpoc && nowEpoc <= endTimeEpoc) {
              isAvailable = false;
              meetingsMeta.onGoingMeetingCount = meetingsMeta.onGoingMeetingCount + 1;
            }
            if(todayDate() === date){
              meetingsMeta.todayMeetingCount = meetingsMeta.todayMeetingCount + 1;
            }
          })
          meetingRooms.push({ name, id, isAvailable, floor});
        });
        buildings.push({name, id})
        return {buildings, meetingRooms, meetingsMeta};
      }, initialData) as IAppData;
}

export const meetingRoomAvailableInBuilding = (building: IBuilding, date: string, startTime: string, endTime: string): IMeetingRoom[] | undefined => {
    const {startTimeEpoc: startTimeEpocOfNewMeeting, endTimeEpoc: endTimeEpocOfNewMeeting} = convertDateAndTimeToEpoc(date, startTime, endTime);
    return building?.meetingRooms?.map((meetingRoom)=>{
        let isAvailable = true;
        meetingRoom.meetings?.forEach((meeting: IMeeting)=>{
            const { date, startTime, endTime} = meeting;
            const { startTimeEpoc, endTimeEpoc} = convertDateAndTimeToEpoc(date, startTime, endTime);
            if(
                (startTimeEpocOfNewMeeting >=startTimeEpoc && startTimeEpocOfNewMeeting<=endTimeEpoc) ||
                (endTimeEpocOfNewMeeting >=startTimeEpoc && endTimeEpocOfNewMeeting<=endTimeEpoc)
            ) {
                isAvailable = false;
            }
            
        })
        return ({...meetingRoom, isAvailable});
    })
}