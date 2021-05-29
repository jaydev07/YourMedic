import './App.css';
import React,{useCallback,useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
 } from "react-router-dom";

import {AuthContext} from "./shared/context/AuthContext";
import HomePage from "./authentication/HomePage";
import PatientAuth from "./authentication/PatientAuth";
import DoctorAuth from "./authentication/DoctorAuth";
import ShowAllDoctors from "./patient/pages/ShowAllDoctors";
import Home from "./patient/pages/Home";
import GetPatients from './doctor/pages/GetPatients';
import ConsultRequests from './doctor/pages/CosultRequests';
import AddSymptoms from "./patient/pages/AddSymptoms";
import Prescribe from './doctor/pages/Prescribe';

const App = () => {

  const [isLogedIn , setIsLogedIn] = useState(false);
  const [userId , setUserId] = useState();
  const [token , setToken] = useState();

  const login = useCallback((userId,token) => {
    setIsLogedIn(true);
    setUserId(userId);
    setToken(token);
  },[]);

  const logout = useCallback((userId) => {
    setIsLogedIn(false);
    setUserId(null);
    setToken(null);
  },[]);

  let routes;
  if(isLogedIn){
    routes = (
      <Switch>
        <Route path="/showalldoctors" exact>
          <ShowAllDoctors />
        </Route>

        <Route path="/patients" exact>
          <GetPatients />
        </Route>

        <Route path="/consultrequests" exact>
          <ConsultRequests />
        </Route>

        <Route path="/addsymptoms" exact>
          <AddSymptoms />
        </Route>

        <Route path="/" exact>
          <Home />
        </Route>

        <Redirect to="/" />
      </Switch>
    )
  }else{
    routes = (
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
    )
  }

  return(
    <AuthContext.Provider value={{
      isLogedIn:isLogedIn,
      userId:userId,
      token:token,
      login:login,
      logout:logout
    }}>
      <Router>
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
