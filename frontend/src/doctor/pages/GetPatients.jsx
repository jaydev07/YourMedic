import React,{useState,useContext,useEffect} from "react";
import {useHistory} from "react-router-dom";

import {AuthContext} from "../../shared/context/AuthContext";
import Backdrop from "../../shared/UIElements/Backdrop";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

const GetPatients = () => {
    
    const auth = useContext(AuthContext);
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState();

    const [patients, setPatients] = useState([]);

    const errorHandler = () => {
        setError(null);
    }

    // get patients from backend
    useEffect(() => {
        const sendRequest = async () => {
            try{
                setIsLoading(true);
                const response = await fetch(`http://localhost:8080/api/doctor/patients/${auth.userId}`);
                const responseData = await response.json();     
                
                if(responseData.message){
                    throw new Error(responseData.message);
                }
                
                setPatients(responseData.patients);
            }catch(err){
                console.log(err);
                setError(err.message);
            }
            setIsLoading(false);
        };
        sendRequest();
    }, []);

    // * create a list of cards
    const totalPatients = patients.map(patient => {
        return (
            <div key={patient.id}>
                <h2>Name: {patient.name}</h2>
                <h5>Starting Date: {patient.startDate}</h5>
                <h4>Phone Number: {patient.phoneNo}</h4>
                <h4>Location: {patient.city}, {patient.state}</h4>
            </div>
        )
    })

    return (
        <React.Fragment>
            { error && (
                <React.Fragment>
                    <Backdrop onClick={errorHandler} />
                    <ErrorModal heading="Error Occured!" error={error} />
                </React.Fragment>
            )}
            { isLoading && <LoadingSpinner asOverlay />}

            { !isLoading && patients && (
                <React.Fragment>
                <h1>Patients</h1>
                <hr />
                {totalPatients}  
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default GetPatients;
