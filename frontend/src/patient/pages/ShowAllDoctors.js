import React,{useState,useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";

import {AuthContext} from "../../shared/context/AuthContext";
import Backdrop from "../../shared/UIElements/Backdrop";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

const ShowAllDoctors = () => {

    const auth = useContext(AuthContext);
    const history = useHistory();
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState();
    const [popup , setPopup] = useState();

    const [doctors , setDoctors] = useState();
    const [showAllDoctors , setShowAllDoctors] = useState(true);

    // To handle error
    const errorHandler = () => {
        setError(null);
        setPopup(null);
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

    const sendConsultRequest = async (doctorId,doctorName) => {
        try{
            setIsLoading(true);
            const response = await fetch(`http://localhost:8080/api/patient/consultdoctor`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patientId:auth.userId,
                    doctorId:doctorId
                })
            });
            const responseData = await response.json();

            if(responseData.message){
                throw new Error(responseData.message);
            }

            setPopup(`Your request has been sended to Dr.${doctorName},You will get an email when he confirms it.`);
        }catch(err){
            console.log(err);
            setError(err.message);
        }
    }

    const goToHome = () => {
        history.push("/");
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
            { popup && (
                <React.Fragment>
                    <Backdrop onClick={errorHandler} />
                    <ErrorModal heading="Message" error={popup} button={true} handleButton={goToHome}/>
                </React.Fragment>
            )}
            { error && (
                <React.Fragment>
                    <Backdrop onClick={errorHandler} />
                    <ErrorModal heading="Error Occured!" error={error} />
                </React.Fragment>
            )}
            { isLoading && <LoadingSpinner asOverlay />}

            <h1>List of Doctors</h1>
            <button onClick={getDoctosNearBy}>{showAllDoctors ? "Get doctors near by" : "Show all doctors"}</button>

            { !isLoading && doctors && (
                doctors.map(doctor => {
                    return(
                        <div key={doctor.id}>
                            <h5>Name: {doctor.name}</h5>
                            <p>Email: {doctor.email}</p>
                            <p>Contact No.: {doctor.phoneNo}</p>
                            <p>City: {doctor.city}</p>
                            <p>State: {doctor.state}</p>
                            {doctor.gender==="Male" ? "M" : "F"}
                            <p>Designation: {doctor.designation}</p>
                            <p>Current Patients: {doctor.currentPatientsLength}</p>
                            <button onClick={() => sendConsultRequest(doctor.id,doctor.name)}>Consult</button>
                            <br />
                        </div>
                    )
                })
            )}
        </React.Fragment>
    );
}

export default ShowAllDoctors;