Pet Clinic Application This is a web-based pet clinic application designed to assist both doctors and pet owners in managing their pets' information and appointments.
The application provides a user-friendly interface for various functionalities. Below are the key features and user roles:

Features: List of Pets:

Doctors can view a list of registered pets, including their name, type, status, and last clinic visit. A checkbox allows filtering pets by the "alive" status. Add New visit:

Owners can add a new pet by providing the pet's name, date of birth, and type. Upon submission, the pet is added to the system. Detailed Pet Information:

Doctors can access detailed information about a specific pet, including owner details and a chronological list of clinic visits. A "doctor's only" comment section is available for internal notes. Edit Pet Information:

Doctors can edit a pet's information, including changing the status ("alive," "deceased," "missing," "other") and updating the "doctor's only" comment. Add Visit:

Doctors can add a visit to a pet, specifying the date and an optional reason for the visit. Upcoming Visits:

Doctors can view a list of upcoming visits, sorted chronologically. Owner's Pet List:

Pet owners can view a list of their registered pets. Owner's Detailed Pet Info:

Pet owners can view detailed information about their pets, excluding the "doctor's only" section. Make a Visit (Pet Owner):

Pet owners can create a visit for their pets, specifying a future date and a mandatory text comment. Prevents double reservations on the same date.

User Authentication:

Users can log in as either a doctor or a pet owner using a login form on the front page. Getting Started: Clone the repository. Set up the backend and database. Install dependencies.

Run the application.

Technologies Used:

Frontend: frameworks React).

Backend: Node.js, Express.

User Authentication: JWT (JSON Web Tokens).


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
