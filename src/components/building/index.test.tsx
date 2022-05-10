import { render, screen } from '@testing-library/react';
import Buildings from './';

const mockBuildings: IBuilding[] = [
    {
        id: 1,
        name: "Test Building 1",
        meetingRooms:  [
            {
                id: 11,
                name: "Meeting Room1",
                isAvailable: true
            }
        ]
    },
    {
        id: 2,
        name: "Test Building 2",
        meetingRooms:  [
            {
                id: 111,
                name: "Meeting Room 2",
                isAvailable: false
            }
        ]
    }
]
test('check heading is rendered', () => {
  render(<Buildings buildings={mockBuildings}/>)
  const heading = screen.getByText("Buildings");
  expect(heading).toBeInTheDocument();
});

test('check each building is rendered', () => {
    render(<Buildings buildings={mockBuildings}/>)
    mockBuildings.map((building) => {
        const buildingElement = screen.getByText(building.name);
        expect(buildingElement).toBeInTheDocument();
    })
});
