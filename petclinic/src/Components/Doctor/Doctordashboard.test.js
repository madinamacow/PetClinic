import { render, screen } from '@testing-library/react';
import Doctordashboard from './Doctordashboard';
import { PetDataContext } from "../../Services/FetchPetsComponent";
import { createMemoryHistory } from "history";
import { MemoryRouter } from "react-router-dom";
describe('Doctordashboard', () => {
  const history = createMemoryHistory();

  test('renders Doctordashboard component', () => {
  
      // const mockPetData = [
      //   { petId: 1, date: '2022-01-01' },
      //   { petId: 1, date: '2023-01-01' },
      //   { petId: 2, date: '2022-01-01' },
      // ];
      // const id = 1;
      // const lastPastVisit = Visits.filter(
      //   (visit) => visit.petId === id && new Date(visit.date) <= new Date()
      // );
  
      const mockPetData = { 
          Visits: [
            { petId: 1, date: '2022-01-01' },
            { petId: 1, date: '2023-01-01' },
            { petId: 2, date: '2022-01-01' },
          ],
       
        };

      
    render(
      <PetDataContext.Provider value={{ petData: mockPetData }}>
            <MemoryRouter history={history}>

        <Doctordashboard />
        </MemoryRouter>
      </PetDataContext.Provider>
    );


    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('petType')).toBeInTheDocument();
    expect(screen.getByText('status')).toBeInTheDocument();
    expect(screen.getByText('LastVisit / Booked')).toBeInTheDocument();
  });
});