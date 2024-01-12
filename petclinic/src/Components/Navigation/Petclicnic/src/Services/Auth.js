import { useEffect, useContext } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

import { PetDataContext } from "./FetchPetsComponent";

export default function Auth() {

const { petData,  setUserRole, setAccessToken,formSubmitted, setError , setIsLoggedin} = useContext(PetDataContext);
console.log(petData);
  useEffect(() => {
    const login = async () => {
      setError(false);

        try {
          const loginResponse = await axios.post("http://localhost:4000/login", {
            email: petData.email,
            password: petData.password,
          });

          setAccessToken(loginResponse.data.access_token);
        //  console.log("wakaa",loginResponse.data.ownerId);
          const decodedToken = jwtDecode(loginResponse.data.access_token);
          const userRoleFromToken = decodedToken.role;
          console.log("response", loginResponse);
          
          setUserRole(userRoleFromToken);

          console.log(userRoleFromToken);
          localStorage.setItem("token", loginResponse.data.access_token);
          setIsLoggedin(true);

        } catch (error) {
          // Set login error to true on failed login
          setError(true); 

        }
      
    };

    if (formSubmitted && petData.email && petData.password) {

      login();
      // console.log(login());
    }
  }, [formSubmitted, petData, setAccessToken, setUserRole, setError, setIsLoggedin]);
  return null;
}