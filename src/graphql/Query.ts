import { gql } from "@apollo/client";

export const GET_ALL_BUILDINGS = gql`{
    Buildings {
        name
        id
        meetingRooms {
            name
            id
            meetings {
                title
                date
                startTime
                endTime
            }
        }
    }
}`;

export const GET_BUILDING_BY_ID = gql`
  query Building($id: Int!) {
    Building(id: $id) {
      name,
      id,
      meetingRooms {
        name
        id
        floor
        meetings {
          date
          startTime
          endTime
        }
      }
  }
}`;

