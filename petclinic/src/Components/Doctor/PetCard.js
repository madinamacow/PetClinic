import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../../Styles/userpage.css";


 export default function PetCard({ pet, pastVisits, handleExpandClick, expanded, addVisit }) {
    const backgroundColor = pet.status === "alive" ? "blue" : "purple";
    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
        marginLeft: "auto",
        marginRight: -188,
        textAlign: "center",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest,
        }),
      }));
      
        return (
          <>
            <Card
              onClick={() => addVisit(pet.id)} title="Click to add a visit" style={{ cursor: "pointer" }}   
              key={pet.id}
              sx={{
                // maxWidth: 645,
                marginTop: '15px',
                marginLeft: 75,
                 marginRight: 75,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                backgroundColor: backgroundColor,
                marginBottom: 10,
                color: "white",

              }}
            >
              {/* rest of your Card component... */}

              <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="pet">
                      {pet.name.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={pet.name}
                />

                <Typography
                  gutterBottom
                  style={{ padding: "10px 0", fontSize: "18px" }}
                  variant="p"
                  component="div"
                >
                  <label style={{ fontWeight: "bold", marginRight: 20 }}>
                    pet name:
                  </label>
                  {pet.name}
                </Typography>

                <Typography
                  gutterBottom
                  style={{ padding: "10px 0" }}
                  variant="p"
                  component="div"
                >
                  <label
                    style={{
                      fontWeight: "bold",
                      marginRight: 40,
                      marginLeft: -20,
                    }}
                  >
                    type:
                  </label>

                  {pet.petType}
                  <Typography
                    gutterBottom
                    style={{ padding: "10px 0" }}
                    variant="p"
                    component="div"
                  >
                    <label
                      style={{
                        fontWeight: "bold",
                        marginRight: 20,
                        marginLeft: -20,
                      }}
                    >
                      Status:
                    </label>

                    {pet.status}
                  </Typography>
                  <Typography
                    style={{ padding: "10px 0" }}
                    gutterBottom
                    variant="p"
                    component="div"
                  >
                    <label
                      style={{
                        fontWeight: "bold",
                        marginRight: 10,
                        marginLeft: 40,
                      }}
                    >
                      Birthday:
                    </label>
                    {pet.dob}
                  </Typography>
                  <Typography
                    style={{ padding: "10px 0" }}
                    gutterBottom
                    variant="p"
                    component="div"
                  >
                
                  </Typography>
                </Typography>
                <CardActions disableSpacing>
                  <ExpandMore
                    expand={expanded[pet.id] || false}
                    onClick={(event) => {
                      event.stopPropagation(); // Stop event propagation
                      handleExpandClick(pet.id);
                    }}
                    aria-expanded={expanded[pet.id] || false}
                    aria-label="show more"
                  title="Click to see past visits" style={{ cursor: "pointer" , color: "white"}}
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse
                  in={expanded[pet.id] || false}
                  timeout="auto"
                  unmountOnExit
                  

                >
                  <CardContent>
                    <Typography paragraph>Visit history:</Typography>
                    {pastVisits.length > 0 ? (
                      pastVisits.map((visit, index) => (
                        <Typography key={index} component="p">
                          Visit Date:
                          {new Date(visit.date).toLocaleDateString()}
                        </Typography>
                      ))
                    ) : (
                      <span>No past visits</span>
                      
                    )}
                  </CardContent>
                </Collapse>
              </Card>

           
          </>
        );
      }



