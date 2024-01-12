import React, { useState } from "react";
import { PetDataContext } from "../../Services/FetchPetsComponent";
import { useContext } from "react";
import "./../../Styles/Add.css";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const AddPet = () => {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petBirthDate, setPetBirthDate] = useState("");
  // const [petNotes, setPetNotes] = useState("");
  const [createdPet, setCreatedPet] = useState("");

  const { accessToken, setRefreshData, petData } = useContext(PetDataContext);
  // const data=petData.map((get)=>get.ownerId);
const navigate = useNavigate();
  const OwnerId = [...new Set(petData.map((get) => get.ownerId)
    
    )];
  const submitData = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/pets", 
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    console.log("sended",data);

      console.log("res:", response);
      const newpet = response.data; // access data directly
      console.log("New pet created:", newpet);
      setCreatedPet(newpet); // set the created pet
      console.log("sended",data);

      setRefreshData(true);
    } catch (error) {
      console.error(`HTTP error! status: ${error.response.status}`);
    }
  };

console.log("sended",OwnerId)
  const handleSubmit = (e) => {
    e.preventDefault();

    submitData({
      dob: petBirthDate,
      name: petName,
      ownerId: OwnerId[0],
      petType: petType,
    });

    // Clear the input fields
    setPetName("");
    setPetType("");
    setPetBirthDate("");
    navigate("/PetClinic");
  };

  return (
    <div
      className="colorfull"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: 'wheat' }}>Add Pet</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px",
        }}
      >
        <label style={{color:'wheat'}}>Pet Name</label>
        <input
          type="text"
          required
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          style={{ padding: "10px" }}
        />
        <label style={{color:'wheat'}}>Pet Type</label>
        <input
          type="text"
          required
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
          style={{ padding: "10px" }}
        />
        <label style={{color:'wheat'}}>Pet Birth Date</label>
        <input
          type="date"
          required
          value={petBirthDate}
          onChange={(e) => setPetBirthDate(e.target.value)}
          style={{ padding: "10px" }}
        />
      
        <button
          style={{
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
            marginLeft: "100px",
          }}
        >
          Add Pet
        </button>
      </form>
      {createdPet && (
        <p
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#d4edda",
            color: "#155724",
            border: "1px solid #c3e6cb",
            borderRadius: "5px",
          }}
        >
          New pet created: {createdPet.name}
        </p>
      )}
    </div>
  );
};
export default AddPet;
