import React, { useState, useEffect, useContext } from "react";
import "../../Styles/edit.css";
import { PetDataContext } from "../../Services/FetchPetsComponent";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPet = () => {
  const { accessToken,setRefreshData,setEditedPetId } = useContext(PetDataContext);
  const { id } = useParams();
const navigate =useNavigate()
  const [value, setValue] = useState({
    dob: "",
    comment: "",
    name: "",
    petType: "",
    status: "",
  });

  const [comment, setComment]=useState("");
const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:4000/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setValue({
          dob: response.data.dob,
          comment: response.data.doctorsComment,
          name: response.data.name,
          petType: response.data.petType,
          status: response.data.status,
        });
        console.log(response);
      })
      .catch((error) => {
        console.error(`HTTP error! status: ${error.response.status}`);
      });
  }, [id]);
  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    axios
      .put(`http://localhost:4000/pets/${id}`, value, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setValue((prevState) => ({
          ...prevState,
         
          comment: response.data.doctorsComment,
          status: response.data.status,

        }));
        console.log(response);
        console.log(response.data);
        setRefreshData(true); // Add this line
        setEditedPetId(id); // Add this line

        navigate("/Dashboard");

      })
      .catch((error) => {
        console.error(`HTTP error! status: ${error.response.status}`);
      });
  };
  const handleComment = async (e) => {
    e.preventDefault();
    setComment(prev => ({
      ...prev,
      comment: prev.comment + '\n' + e.target.value
    }));
    console.log("comment" + comment);
  }
  return (
    <div className="form-container">
      <div className="edit-pet-form">

        <h1 className="form-title">EditPetForm</h1>
        <form onSubmit={handleSubmit} className="form">
          {/* Your form fields go here */}
          <label>Pet Name</label>
          <input type="text" required value={value.name} readOnly />

          <label>Pet Birth Date</label>
          <input type="date" required value={value.dob} readOnly />
          <label>Pet petType</label>
          <input
            type="text"
            required
            value={value.petType}
            onChange={(e) => setValue({ ...value, petType: e.target.value })}
          />
            <label>Pet Status</label>
         
          <select name="status" id="status" onChange={(e) => setValue({ ...value, status: e.target.value })}
    style={{ padding: "10px" }} 
    // value={petNotes}  // Make sure to include this
    value={value.status}

    required>
    <option>select</option>
  <option value="alive">alive</option>
  <option value="deceased">deceased</option>  
  <option value="missing">missing</option>
  <option value="other">other</option>
   </select>

          <label>doctorsComment</label>
          <textarea
  value={value.comment}
  onChange={(e) => setValue({ ...value, comment: e.target.value })}
  rows={10}
  cols={30}
    title="this is pet owner's comment about the pet"

/>



          <button
            style={{
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => {
    // Append new comment to existing comments
    setComment(prevComment => prevComment + '\n' + newComment);
    // Clear new comment
    setNewComment('');
  }}
   
          >
            save
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditPet;
