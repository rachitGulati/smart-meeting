import { render, screen } from "@testing-library/react";
import useAppState from "./use-app-state";
import { MockedProvider } from '@apollo/client/testing';
import { GET_ALL_BUILDINGS } from "../graphql/Query";

const mockData = {
  Buildings: [
    {
      name: "mock Building 8",
      id: 1,
      meetingRooms: [
        {
          name: "Punjab", "id": 1,
          meetings: [
            {
              "title": "Booked for Interview",
              "date": "13/02/2019",
              "startTime": "19:00",
              "endTime": "20:00"
            },
            {
              "title": "Meeting in punjab from 10:50 to 11:00",
              "date": "12/05/2022",
              "startTime": "22:50",
              "endTime": "22:55",
            }],
        },
      ]
    },
    {
      name: "mock Building 4",
      id: 2,
      meetingRooms: [],
    }, {
      name: "Mock Building 6",
      id: 3,
      meetingRooms: []
    }]
}
export const TestComponent = () => {
  const { error, loading, buildings, meetingRooms, meetingsMeta } = useAppState();
  if (loading) {
    return <div data-testid="loading"> loading...</div>;
  }
  if (error) {
    return <div data-testid="error"> Somthing went wrong...</div>;
  }

  return (
    <>
      {buildings && <div data-testid="building">Building Loaded...</div>}
      {meetingRooms && <div data-testid="meetingroom">meetingRooms Loaded...</div>}
      {meetingsMeta && <div data-testid="meetingmetadata">meetingsMeta Loaded...</div>}
    </>
  )
}

it("useAppState hook runs correctly for loading and data", async () => {
  const buildingsMock = {
    request: {
      query: GET_ALL_BUILDINGS,
    },
    result: {
      data: mockData,
    },
  };

  render(
    <MockedProvider mocks={[buildingsMock]} addTypename={false}>
      <TestComponent />
    </MockedProvider>);
  await screen.findByTestId("loading");
  expect(screen.getByTestId("loading")).toBeInTheDocument();
  expect(screen.queryByTestId("building")).not.toBeInTheDocument();

  await screen.findByTestId("building");
  expect(screen.getByTestId("building")).toBeInTheDocument();
  expect(screen.getByTestId("meetingroom")).toBeInTheDocument();
  expect(screen.getByTestId("meetingmetadata")).toBeInTheDocument();
});

it("useAppState hook runs correctly for error", async () => {
  const buildingsMock = {
    request: {
      query: GET_ALL_BUILDINGS,
    },
    error: new Error('An error occurred'),
  };
  render(
    <MockedProvider mocks={[buildingsMock]} addTypename={false}>
      <TestComponent />
    </MockedProvider>);
  await screen.findByTestId("error");
  expect(screen.getByTestId("error")).toBeInTheDocument();
})