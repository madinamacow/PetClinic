import { render, screen } from '@testing-library/react';
import { PetDataContext } from '../../Services/FetchPetsComponent';
import PetDetails from './PetDetails';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useParams: () => ({
    id: '1', 
  }),
}));

describe('PetDetail', () => {
  test('renders PetDetail component', () => {
    const mockPetData = [
      { id: 1, name: 'Test Pet', petType: 'Dog', status: 'Healthy', doctorsComment: 'No issues' }
    ];
    const mockVisits = [
      { petId: 1, date: '2022-01-01' }
    ];

    render(
      <PetDataContext.Provider value={{ petData: mockPetData, Visits: mockVisits }}>
        <MemoryRouter initialEntries={['/pet/1']}>
          <PetDetails />
        </MemoryRouter>
      </PetDataContext.Provider>
    );

    expect(screen.getByText(/Test Pet/i)).toBeInTheDocument();
    expect(screen.getByText(/Dog/i)).toBeInTheDocument();
    expect(screen.getByText(/Healthy/i)).toBeInTheDocument();
    expect(screen.getByText(/No issues/i)).toBeInTheDocument();
  });
});