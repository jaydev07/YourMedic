import React,{useState,useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";

import {AuthContext} from "../../shared/context/AuthContext";
import Backdrop from "../../shared/UIElements/Backdrop";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import DoctorList from "../components/DoctorList";
import "./ShowAllDoctors.css";
import BackgroungImg from '../../Photos/DrListGg.jpg';

const ShowAllDoctors = () => {

    const auth = useContext(AuthContext);
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState();

    const [doctors , setDoctors] = useState();
    const [showAllDoctors , setShowAllDoctors] = useState(true);

    // To handle error
    const errorHandler = () => {
        setError(null);
    }

    const getDoctosNearBy = async () => {
        if(showAllDoctors){
            try{
                setIsLoading(true);
                const response = await fetch(`http://localhost:8080/api/patient/doctorsNearBy/${auth.userId}`);
                const responseData = await response.json();
    
                if(responseData.message){
                    throw new Error(responseData.message);
                }
    
                setDoctors(responseData.doctors);
            }catch(err){
                console.log(err);
                setError(err.message);
            }
            setIsLoading(false);
        }else{
            try{
                setIsLoading(true);
                const response = await fetch("http://localhost:8080/api/doctor/all");
                const responseData = await response.json();

                if(responseData.message){
                    throw new Error(responseData.message);
                }

                setDoctors(responseData.doctors);
            }catch(err){
                console.log(err);
                setError(err.message);
            }
            setIsLoading(false);
        }
        setShowAllDoctors(pre => !pre);
    }

    useEffect(() => {
        const sendRequest = async () => {
            try{
                setIsLoading(true);
                const response = await fetch("http://localhost:8080/api/doctor/all");
                const responseData = await response.json();

                if(responseData.message){
                    throw new Error(responseData.message);
                }

                setDoctors(responseData.doctors);
            }catch(err){
                console.log(err);
                setError(err.message);
            }
            setIsLoading(false);
        }
        sendRequest();
    },[])

    return(
        <React.Fragment>
            <div style={{backgroundImage: `url(${BackgroungImg})`,backgroundSize:"contain"}}>
                { error && (
                    <React.Fragment>
                        <Backdrop onClick={errorHandler} />
                        <ErrorModal heading="Error Occured!" error={error} />
                    </React.Fragment>
                )}
                { isLoading && <LoadingSpinner asOverlay />}

                <p className="Title" style={{float:"left",backgroundImage: `url(${BackgroungImg})`,fontSize:"4em"}}>List of Doctors</p>
                <div style={{clear:"both"}}>
                    <button className="NearByBtn" onClick={getDoctosNearBy}>{showAllDoctors ? "Get doctors near by" : "Show all doctors"}</button>
                </div>
                { !isLoading && doctors && (
                    <DoctorList doctors={doctors}/>
                )}
            </div>
        </React.Fragment>
    );
}

export default ShowAllDoctors;