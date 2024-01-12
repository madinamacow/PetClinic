import "./App.css";
import { useNavigate, Route, Routes } from "react-router-dom";
import Login from "./utils/Login";
import { PetDataContext } from "./Services/FetchPetsComponent";
import { useState, useEffect } from "react";
import Auth from "./Services/Auth";
import FetchPetData from "./Components/fetchUrl/FetchPetData"; 
import PetDetails from "./Components/PetDetails/PetDetails";
import AddPet from "./Components/AddPet/AddPet";
import EditPet from "./Components/EditPets/EditPet";
import AddVisit from "./Components/AddVisit/AddVisit";

import UpcomingVisits from "./Components/UpcommingVisits/UpcomingVisits";
import Doctordashboard from "./Components/Doctor/Doctordashboard";
import UserPage from "./Components/UserDashboard/UserPage";
const App = () => {
  const [petData, setPetData] = useState([]);
  const [Visits, setVisits] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [display, setDisplay] = useState(false);
  const [Error, setError] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [editedPetId, setEditedPetId] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [ownerId, setOwnerId] = useState(null);

  const state = {
    petData,
    setPetData,
    setFormSubmitted,
    userRole,
    setAccessToken,
    setUserRole,
    accessToken,
    formSubmitted,
    display,
    setDisplay,
    setError,
    Error,
    Visits,
    setVisits,
    refreshData,
    setRefreshData,
    editedPetId,
    setEditedPetId,
    isLoggedin,
    setIsLoggedin,
    ownerId,
    setOwnerId,
  };
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, []);
  return (
    <div className="App">
      <PetDataContext.Provider value={state}>
      {/* //Authentication */}
        <Auth />
        {/* fetchesUrl  */}
        <FetchPetData/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Doctordashboard />} />
          <Route path="/Update/:id" element={<EditPet />} />
          <Route path="/addpet" element={<AddPet />} />
          <Route path="/PetDetail/:id" element={<PetDetails />} />
          <Route path="/AddVisit/:id" element={<AddVisit />} />
          <Route path="/PetClinic" element={<UserPage />} />
          <Route path="/Visits" element={<UpcomingVisits />} />
        </Routes>
      </PetDataContext.Provider>
    </div>
  );
};

export default App;
