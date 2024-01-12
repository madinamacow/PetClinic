import React, { useContext } from "react";
import { PetDataContext } from "../../Services/FetchPetsComponent";
import Typography from "@mui/material/Typography";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Nav from "../Navigation/Nav";
export default function UpcomingVisits() {
const { petData, Visits ,userRole} = useContext(PetDataContext);

  const upcomingVisits = petData.flatMap((pet) => {
    const petVisits = Visits.filter((visit) => visit.petId === pet.id);
    return petVisits.filter((visit) => new Date(visit.date) > new Date()).map(visit => ({...visit, petName: pet.name}));
  });
  const navigate = useNavigate(); 

  
  const handleBack = () => {
    navigate(-1); // Go back to the previous page

  };

  return (
    <>
    <Nav/>
    {upcomingVisits.length > 0 ? (
      
        <TableContainer component={Paper}>
          <h1>Upcoming Visits</h1>
          <div style={{ marginRight: '200rem'}}>
  <IconButton  color="inherit" onClick={handleBack} aria-label="back" >
            <ArrowBack/>
          </IconButton>
          </div>
        
          <Table 
          sx={{ minWidth: 150,overflowX: 'hidden' }}
          // size="medium"
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: 'lightblue' }}>
                <TableCell>Date</TableCell>
                <TableCell>Pet Name</TableCell>
                {
                    userRole === 'doctor' ?  <TableCell> Commented about visit</TableCell> : null

                  }

              </TableRow>
            </TableHead>
            <TableBody>
              {upcomingVisits.map((visit, index) => (
                <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'lightgrey' : 'white' }}>
                  <TableCell>{new Date(visit.date).toLocaleDateString()}</TableCell>
                  <TableCell>{visit.petName}</TableCell>
                  {
                    userRole === 'doctor' ? <TableCell>{visit.comment === null ? 'no comment' : visit.comment}</TableCell> : null
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
      <Typography variant="h3" color="secondary" align="center" gutterBottom>
        No Upcoming visits make Appointment now :)
      </Typography>
      )}
    </>
  );
}