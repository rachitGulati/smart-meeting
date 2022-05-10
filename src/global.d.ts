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