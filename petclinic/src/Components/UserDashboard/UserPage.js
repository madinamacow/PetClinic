import * as React from "react";

import "../../Styles/userpage.css";
import { useState, useContext } from "react";
import { PetDataContext } from "../../Services/FetchPetsComponent";
import { useNavigate } from "react-router-dom";
import PetCard from "../Doctor/PetCard";
import Nav from "../Navigation/Nav";

export default function UserPage() {
  const { petData, Visits } = useContext(PetDataContext);
  const [visit, setVisit] = useState([]);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = (id) => {
    setExpanded(!expanded);
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const navigate = useNavigate();

  const addVisit = (id) => {
     //  set the id of the clicked pet
    setVisit(id);
    navigate(`/AddVisit/${id}`);
  };


  return (
    <>
      <Nav />

      {petData.map((pet) => {
        const petVisits = Visits.filter((visit) => visit.petId === pet.id);

        const sortedPetVisits = petVisits.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        const upcomingVisits = sortedPetVisits.filter(
          (visit) => new Date(visit.date) > new Date()
        );
        const pastVisits = sortedPetVisits.filter(
          (visit) => new Date(visit.date) < new Date()
        );

        return (
          <>
            <PetCard
              pet={pet}
              upcomingVisits={upcomingVisits}
              pastVisits={pastVisits}
              handleExpandClick={handleExpandClick}
              expanded={expanded}
              addVisit={addVisit}
            />
          </>
        );
      })}
    </>
  );
}
