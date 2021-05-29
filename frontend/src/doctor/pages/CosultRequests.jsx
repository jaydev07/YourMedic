import React,{useState,useContext,useEffect} from "react";
import {useHistory} from "react-router-dom";

import {AuthContext} from "../../shared/context/AuthContext";
import Backdrop from "../../shared/UIElements/Backdrop";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

const ConsultRequests = () => {

    const auth = useContext(AuthContext);
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState();
    const [popup , setPopup] = useState();

    const [patients, setPatients] = useState();
    const [listChange , setListChange] = useState(false);

    const accept = async (patientId,patientName) => {
        try{
            setIsLoading(true);
            const response = await fetch(`http://localhost:8080/api/doctor/confirm/patient/${auth.userId}`,{
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patientId: patientId
                })
            });
            const responseData = await response.json();

            if(responseData.message){
                throw new Error(responseData.message);
            }

            setPopup(`${patientName}'s request is been confirmed`);
        }catch(err){
            console.log(err);
            setError(err.message);
        }
        setIsLoading(false);
        setListChange(pre => !pre);
    }

    const reject = async (patientId,patientName) => {
        try{
            setIsLoading(true);
            const response = await fetch(`http://localhost:8080/api/doctor/reject/patient/${auth.userId}`,{
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patientId: patientId
                })
            });
            const responseData = await response.json();

            if(responseData.message){
                throw new Error(responseData.message);
            }

            setPopup(`${patientName}'s request is been rejected`);
        }catch(err){
            console.log(err);
            setError(err.message);
        }
        setIsLoading(true);
        setListChange(pre => !pre);
    }

    const errorHandler = () => {
        setError(null);
        setPopup(null);
    }
    const handleModelButton = () => {
        setError(null);
        setPopup(null);
    }

    // get patients from backend
    useEffect(() => {
        const sendRequest = async () => {
            try{
                setIsLoading(true);
                const response = await fetch(`http://localhost:8080/api/doctor/nonConsulted/patients/${auth.userId}`);
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
    }, [listChange]);

    return (
        <React.Fragment>
            { popup && (
                <React.Fragment>
                    <Backdrop onClick={errorHandler} />
                    <ErrorModal heading="Message" error={popup} button={true} handleButton={handleModelButton}/>
                </React.Fragment>
            )}
            { error && (
                <React.Fragment>
                    <Backdrop onClick={errorHandler} />
                    <ErrorModal heading="Error Occured!" error={error} />
                </React.Fragment>
            )}
            { isLoading && <LoadingSpinner asOverlay />}

            { !isLoading && patients && (
                <React.Fragment>
                    <h1>Nonconsulted Patients</h1>
                    <br />
                    {
                        patients.map(patient => {
                            return (
                                <div key={patient.id}>
                                    <h5>Name: {patient.name}</h5>
                                    <p>Starting Date: {patient.startDate}</p>
                                    <p>Phone Number: {patient.phoneNo}</p>
                                    <p>Location: {patient.city}, {patient.state}</p>
                                    <button onClick={() => accept(patient.id, patient.name)}>Accept</button>
                                    <button onClick={() => reject(patient.id, patient.name)}>Reject</button>
                                    <hr />
                                </div>
                            )
                        })
                    }
                </React.Fragment>
            )}
        </React.Fragment>
    )

}

export default ConsultRequests;
