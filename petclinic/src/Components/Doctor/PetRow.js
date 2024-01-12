
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PetDataContext } from "../../Services/FetchPetsComponent";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import "./../../Styles/pet.css";
const PetRow = ({ pets }) => {
  const { id, name, petType, status} = pets;
  const { Visits } = useContext(PetDataContext);
  const navigate = useNavigate();

  // Get the last past visit for the pet
const lastPastVisit = Visits.filter((visit) => visit.petId === id && new Date(visit.date) <= new Date())
.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

// Check if there are any future visits for the pet
const hasFutureVisit = Visits.some((visit) => visit.petId === id && new Date(visit.date) > new Date());
  const handlePetClick = () => {
    // Redirect to the detailed info page for the selected pet
    // console.log(pets.id);

    navigate(`/PetDetail/${pets.id}`);

  };
  return (
    <>

      <TableBody onClick={handlePetClick } style={{backgroundColor:'black' }}>
        <TableRow key={id} className="tablecell">
          <TableCell align="right" style={{ color: "white" }}>{id}</TableCell>
          <TableCell align="right" style={{ color: "white" }}>{name}</TableCell>
          <TableCell align="right" style={{ color: "white" }}>{petType}</TableCell>
          <TableCell align="right" style={{ color: "white" }}>{status}</TableCell>
          <TableCell align="right" style={{ color: "white" }}>
            {hasFutureVisit ? "they have booked" : lastPastVisit ? lastPastVisit.date : "not visited yet"}
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
        }
 export default PetRow;