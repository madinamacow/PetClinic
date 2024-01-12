import React, { useContext, useState } from "react";
import "../../Styles/pet.css";
import { PetDataContext } from "../../Services/FetchPetsComponent";
import PetRow from "./PetRow";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Nav from "../Navigation/Nav";
const styles = (theme) => ({
  root: {
    display: "flex",
    marginTop: theme.spacing.unit * 3,
    overflowX: "hide",
  },
  table: {
    minWidth: 340,
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5,
  },
});
export default function Doctordashboard() {
  const { classes } = styles;
  const { petData } = useContext(PetDataContext);
  const [search, setSearch] = useState("");
  const [isCheckbox, setIsCheckbox] = useState(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const ticked = (event) => {
    setIsCheckbox(event.target.checked);
  };

  let filteredPetsName = Array.isArray(petData) ? petData : [];
  if (search.length > 0) {
    filteredPetsName = petData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  //checks is pet alive or not
  let isLivePet = isCheckbox
    ? filteredPetsName.filter((pet) => pet.status === "alive")
    : filteredPetsName;

  return (
    <>
      <Nav />

      <h1 className="owner-pet-list-title">Dashboard</h1>
      <div className="wrap">
        <input
          type="text"
          id="myInput"
          placeholder="Search for names.."
          title="Type in a name"
          onChange={handleChange}
          value={search}
          style={{marginLeft: '-50px'}}
        />
        <div className="check-Box">
          <label style={{ color: "white" }}>Alive:</label>

          <Checkbox
            {...{ inputProps: { "aria-label": "Checkbox demo" } }}
            onClick={ticked}
            style={{ color: "blue" }}
          />
        </div>
      </div>
      <TableContainer
        component={Paper}
        // className={classes}
        // style={{ marginTop: 40 }}

        style={{ width: "90%", margin: "auto", marginTop: 40 }}
      >
        <Table
          // sx={{ minWidth: 550}}
          size="medium"
          aria-label="a dense table"
          // className="Table"
          className={classes}
        >
          <TableHead style={{ backgroundColor: "blue" }}>
            <TableRow>
              <TableCell align="right" style={{ color: "white" }}>
                ID
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                Name
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                petType
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                status
              </TableCell>

              <TableCell align="right" style={{ color: "white" }}>
                LastVisit / Booked
              </TableCell>
            </TableRow>
          </TableHead>
          {[...isLivePet]
            .sort((a, b) => a.id - b.id)
            .map((pet) => {
              let lastVisit =
                pet.visits && Array.isArray(pet.visits)
                  ? pet.visits.sort(
                      (a, b) => new Date(b.date) - new Date(a.date)
                    )[0]
                  : null;

              return (
                <>
                  <PetRow key={pet.id} pets={pet} lastVisited={lastVisit} />
                </>
              );
            })}
        </Table>
      </TableContainer>
    </>
  );
}
