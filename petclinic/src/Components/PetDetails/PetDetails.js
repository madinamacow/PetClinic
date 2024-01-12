// PetDetailPage.js
import "../../Styles/detail.css";
import React, { useContext, useState } from "react";
import { PetDataContext } from "../../Services/FetchPetsComponent";
import {  useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Nav from "../Navigation/Nav";
const PetDetail = () => {
  const { Visits, petData } = useContext(PetDataContext);
  const [showVisits, setShowVisits] = useState(false);
  
  // Gets the id from the url
  const { id } = useParams(); 

  // Find the selected pet using the petId
  const selectedPet = petData.find((pet) => pet.id === parseInt(id));
    // console.log("selectedPet:", selectedPet);

  // Find the visits for the selected pet
  const selectedPetVisits = Visits.filter(
    (visit) => visit.petId === selectedPet.id
  );
  // Sorting the selectedPetVisits array in chronological order

  const sortedPetVisits = selectedPetVisits.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const navigate = useNavigate();

  if (!selectedPet) {
    return <div>No pet found for the given ID</div>;
  }

  const handleToggleVisits = () => {
    setShowVisits(!showVisits);
  };
  const AddVisitButton = () => {
    navigate(`/AddVisit/${id}`);


  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "lightgrey",
    ...theme.typography.body2,
    padding: theme.spacing(10),
    marginLeft: theme.spacing(10),
    marginTop: theme.spacing(10),
    textAlign: "center",
    
    color: theme.palette.text.secondary,
  }));
  return (
    <>
    <Nav/>
      <Box sx={{ flexGrow: 1 }}>
      <h1 style={{color:'wheat', marginTop:20}}>PetDetailPage</h1>

        <Grid container spacing={1} columns={12} >
          <Grid xs={6}>
            <Item key={selectedPet.id}>
              <p>
                <strong>name:</strong> {selectedPet.name}
              </p>

              <p>
                <strong>Pet Type:</strong> {selectedPet.petType}
              </p>
              <p>
                <strong>Status:</strong> {selectedPet.status}
              </p>
              <p>
                <strong>Comment:</strong> {selectedPet.doctorsComment}
              </p>
              <button  style={{marginRight:40, marginTop:100}}
              onClick={() => navigate(`/Update/${id}`)}>Edit</button>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <h1> history Visits:</h1>

              {showVisits && (
                <ul>
                {sortedPetVisits.filter(visit => new Date(visit.date) < new Date()).length > 0 ? (
  sortedPetVisits.filter(visit => new Date(visit.date) < new Date()).map((visit) => (
    <li key={visit.id} className="li">
      {visit.date}
      </li>
  ))
) : (
  <span>Hasn't visited yet</span>
)}
                </ul>
              )}

              <button className="btn" onClick={handleToggleVisits}>
                {showVisits ? "Hide Visits" : "Show Last Visit Date"}
              </button>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <h1>Add Visit</h1>
              <button className="btn" onClick={AddVisitButton}>
                add visit
              </button>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default PetDetail;
