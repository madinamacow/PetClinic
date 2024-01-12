

import { cleanup, render, screen } from "@testing-library/react";
// import { renderer } from "react-dom";
import renderer from 'react-test-renderer'; // Correct import

import Login from "./Login";
import { PetDataContext } from "../Services/FetchPetsComponent";

afterEach(()=>{
    cleanup();
});



it("login input", async () => {
  const petData = { email: "madina@gmal.com", password: "jsjdkjs" };
 render(
    <PetDataContext.Provider value={{ petData }}>
      <Login />
    </PetDataContext.Provider>
  );

  expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

it("login button", async () => {
  const petData = { email: "jskajsk@gmal.com", password: "jsjdkjs" };


 render(
    <PetDataContext.Provider value={{ petData }}>
        <Login />
    </PetDataContext.Provider>
);

const LoginBottom = screen.getByRole("button", { name: /login/i });
expect(LoginBottom).toBeEnabled();
// expect(LoginBottom).toBeDisabled();

});
it("login error", async () => {
    const petData = { email: "madina@gmal.com", password: "jsjdkjs" };
    const userRole = "doctor";
    render(
        <PetDataContext.Provider value={{ petData , userRole}}>
            <Login />
        </PetDataContext.Provider>
    );

    
});

// it('matches snapshot', () => {
//   const petData = { email: "madina@gmal.com", password: "jsjdkjs" };
//   const tree = renderer.create(
//     <PetDataContext.Provider value={{ petData }}>
//       <Login />
//     </PetDataContext.Provider>
//   ).toJSON();


//   expect(tree).toMatchSnapshot();
// });
