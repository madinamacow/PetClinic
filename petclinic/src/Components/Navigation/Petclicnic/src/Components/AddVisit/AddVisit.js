import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { PetDataContext } from "../../Services/FetchPetsComponent";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
const AddVisit = () => {
  const { accessToken, Visits, setRefreshData, petData } = useContext(PetDataContext);
  const { id } = useParams();
const navigate = useNavigate();
  console.log("visits:", Visits);
  const [visitData, setVisitData] = useState({
    date: '',
    comment: '',
  });
const [showAlert, setShowAlert] = useState(false);
  // Get the current pet
  const pet = petData.find(pet => pet.id === Number(id));


   // Get the visits for the current pet
  const petVisits = Visits.filter(visit => visit.petId === Number(id));

  const handleDateChange = (e) => {
    setVisitData({
      ...visitData,
      date: e.target.value,
    });
  };

  const handleCommentChange = (e) => {
    setVisitData({
      ...visitData,
      comment: e.target.value,
    });
  };

  console.log("visitData:", visitData);
//   console.log("id:", Number(id));

  const submitData = async (e) => {
    e.preventDefault();
      // Check if the selected date is already booked
      if (petVisits.some((visit) => visit.date === visitData.date)) {
        setShowAlert(true);
    // Set a timeout to shows error then navigates after 2 seconds
      setTimeout(() => {
        setShowAlert(false);
        navigate("/Visits/");
      }, 3000);
        return; //displays when click submit button
      }

    try {
      const response = await axios.post(
        `http://localhost:4000/visits`,
        {
          // backend expecting id to be a number but got a string instead  so i added Number(id)
            petId: Number(id), // Convert id to a number
          date: visitData.date,
          comment: visitData.comment,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      console.log(response);
      navigate("/PetDetail/"+id);
      setRefreshData(true);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="addvisit">
      {showAlert && (
  <Alert severity="info" style={{marginLeft: 100}}>
    <AlertTitle>Info</AlertTitle>
    This date is already booked<p style={{color: 'red'}}> {pet.name} </p> — <strong>
    check it out the Appointment !</strong>
  </Alert>
)}
    <h1>Add Visit</h1>
    <form onSubmit={submitData} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
      <label>Date</label>
      <input
        type="date"
        placeholder="Date"
        value={visitData.date}
        onChange={handleDateChange}
        //the min date is today 
        min={new Date().toISOString().split('T')[0]}
        required
        style={{ margin: '10px 0', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />

      
      <label>Comment (optional)</label>
      <input
        type="text"
        placeholder="Comment"
        value={visitData.comment}
        onChange={handleCommentChange}
        style={{ margin: '10px 0', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button type="submit" style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer' }}>Add Visit</button>
    </form>
  
  </div>
  );
};

export default AddVisit;
