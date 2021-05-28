import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
 } from "react-router-dom";

import HomePage from "./authentication/HomePage";
import PatientAuth from "./authentication/PatientAuth";
import DoctorAuth from "./authentication/DoctorAuth";

const App = () => {
  return(
    <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/auth/doctor" exact>
            <DoctorAuth />
          </Route>

          <Route path="/auth/patient" exact>
            <PatientAuth />
          </Route>

          <Redirect to="/" />
        </Switch>
    </Router>
  );
}

export default App;
