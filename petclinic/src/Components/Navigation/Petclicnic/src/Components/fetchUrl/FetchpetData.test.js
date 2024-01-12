import FetchPetData from './FetchPetData';

const axios = require('axios');
const { render, act } = require('@testing-library/react');
const { PetDataContext } = require("../../Services/FetchPetsComponent");
jest.mock('axios');

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('FetchPetData', () => {
  it('fetches pet data and visits on mount if userRole and accessToken are present', async () => {
    const setPetData = jest.fn();
    const setVisits = jest.fn();
    const setRefreshData = jest.fn();
    const userRole = 'doctor';
    const accessToken = 'token';
    const petData = { data: 'pet data' };
    const visitsData = { data: 'visits data' };

    axios.get.mockImplementation((url) => {
      switch (url) {
        case 'http://localhost:4000/pets':
          return Promise.resolve(petData);
        case 'http://localhost:4000/Visits':
          return Promise.resolve(visitsData);
        default:
          return Promise.reject(new Error('not found'));
      }
    });

    await act(async () => {
      render(
        <PetDataContext.Provider value={{ setPetData, userRole, accessToken, setVisits, setRefreshData }}>
          <FetchPetData />
        </PetDataContext.Provider>
      );
    });

    expect(setPetData).toHaveBeenCalledWith(petData.data);
    expect(setVisits).toHaveBeenCalledWith(visitsData.data);
    expect(setRefreshData).toHaveBeenCalledWith(false);
  });
});