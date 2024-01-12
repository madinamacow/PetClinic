import axios from "axios";

import { useEffect, useContext} from "react";
import { PetDataContext } from "../../Services/FetchPetsComponent";
import { useNavigate } from "react-router-dom";


export default function FetchPetData() {
  const { setPetData, userRole, accessToken, setVisits,refreshData, setRefreshData } =
    useContext(PetDataContext);
const navigate = useNavigate();
  useEffect(() => {
    if (userRole && accessToken) {
      const fetchPetData = async () => {
        try {
          const petResponse = await axios.get("http://localhost:4000/pets", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const Visits = await axios.get("http://localhost:4000/Visits", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
       
          setPetData(petResponse.data);
          setVisits(Visits.data);
          console.log(petResponse.Visits);
          if (accessToken && userRole === "doctor") {
            navigate("/Dashboard");
          } else if (userRole === "pet_owner") {
            navigate("/PetClinic");
          }



        } catch (error) {
          console.error("Error fetching pet data", error);
        }
      };

      fetchPetData();
      setRefreshData(false);

    }
  }, [setVisits, userRole, accessToken, setPetData,refreshData,setRefreshData]);

  return null;
}
