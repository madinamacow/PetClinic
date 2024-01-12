import { render, screen, fireEvent } from "@testing-library/react";
import { PetDataContext } from "../../Services/FetchPetsComponent";
import Nav from "./Nav";
import { createMemoryHistory } from "history";
import { MemoryRouter, Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

it("checks if button (add pet form) presents when  user logged in", () => {
  const history = createMemoryHistory();

  const mockContextValue = {
    setIsLoggedin: jest.fn(),
    userRole: "pet_owner",
  };
  history.push = jest.fn();

  render(
    <PetDataContext.Provider value={mockContextValue}>
      <MemoryRouter history={history}>
        <Nav />
      </MemoryRouter>
    </PetDataContext.Provider>
  );

  // adding assertions here...

  expect(screen.getByRole("button", { name: /add pet/i })).toBeInTheDocument();
});

it("renders Dashboard link when doctor is logged in", () => {
  const history = createMemoryHistory();

  const mockContextValue = {
    setIsLoggedin: jest.fn(),
    userRole: "doctor",
  };
  history.push = jest.fn();

  render(
    <PetDataContext.Provider value={mockContextValue}>
      <MemoryRouter history={history}>
        <Nav />
      </MemoryRouter>
    </PetDataContext.Provider>
  );

  //assertions here...
    expect(screen.getByRole('link', {  name: /home/i})).toHaveAttribute('href', '/Dashboard');

});


it("renders PetClinic link when doctor is logged in", () => {
  const history = createMemoryHistory();

  const mockContextValue = {
    setIsLoggedin: jest.fn(),
    userRole: "pet_owner",
  };
  history.push = jest.fn();

  render(
    <PetDataContext.Provider value={mockContextValue}>
      <MemoryRouter history={history}>
        <Nav />
      </MemoryRouter>
    </PetDataContext.Provider>
  );

  //assertions here...
    expect(screen.getByRole('link', {  name: /home/i})).toHaveAttribute('href', '/PetClinic');

});