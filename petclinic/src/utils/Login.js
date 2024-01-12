
import * as React from "react";
import Form from "react-bootstrap/Form";
import "../Styles/Login.css";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { PetDataContext } from "../Services/FetchPetsComponent";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export default function Login() {
  const {
    petData,
    setPetData,
    setFormSubmitted,
    setDisplay,
    Error,
  } = useContext(PetDataContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    setPetData(data);
    setDisplay(true);
    setFormSubmitted(true);
   
  };
  

  console.log(petData);
  const handleChange = (e) => {
    e.preventDefault();
    // Update petData directly, assuming e.target.name is a property in petData
    setPetData({ ...petData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {Error && (// loginError
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "15",
          }}
          spacing={2}
        >
          <Alert severity="error" sx={{ color: "white" }}>
            <AlertTitle>Error</AlertTitle>
            <strong>check it our your Email and password Please!</strong>
          </Alert>
        </Stack>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{color:"white"}}>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            // value={petData.email= "doctor@pets.com"}
            value={(petData.email)}
            placeholder="Email"
            {...register("email", { required: "Email Address is required" })}
            onChange={handleChange}
          />
          {errors.email?.type === "required" && (
            <p className="error" role="alert">
              email is required
            </p>
          )}
        </Form.Group>

        <Form.Group className="mb" controlId="formBasicPassword">
          <Form.Label  style={{color:"white"}} className="label-mb">password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            // value={setPetData.password="Pet1234"}
            value={(petData.password )}
            placeholder="Password"
            {...register("password", { required: true, minLength: 5 })}
            onChange={handleChange}
          />
          {errors.password?.type === "required" && (
            <p role="alert" className="error">
              password is required
            </p>
          )}
        </Form.Group>
        <div className="container">
  <button className="button" variant="primary"  type="submit" >Login</button>
</div>
      </form>
    </>
  );
}
