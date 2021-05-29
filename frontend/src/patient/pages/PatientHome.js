import React,{useState,useContext,useEffect} from "react";
import {useHistory,Link,useParams} from "react-router-dom";

import {AuthContext} from "../../shared/context/AuthContext";
import Backdrop from "../../shared/UIElements/Backdrop";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

const PatientHome = () => {

    const patientId = useParams().patientId;
    const auth = useContext(AuthContext);
    const history = useHistory();
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState();
    const [patient , setPatient] = useState();

    // To handle error
    const errorHandler = () => {
        setError(null);
    }

    useEffect(() => {
        const sendRequest = async () => {
            try{
                setIsLoading(true);
                const response = await fetch(`http://localhost:8080/api/patient/info/${patientId}`);
                const responseData = await response.json();     
                
                if(responseData.message){
                    throw new Error(responseData.message);
                }
                
                setPatient(responseData.patient);
            }catch(err){
                console.log(err);
                setError(err.message);
            }
            setIsLoading(false);
        };
        sendRequest();
    },[]);

    return(
        <React.Fragment>
            { error && (
                <React.Fragment>
                    <Backdrop onClick={errorHandler} />
                    <ErrorModal heading="Error Occured!" error={error} />
                </React.Fragment>
            )}
            { isLoading && <LoadingSpinner asOverlay />}
            
            { !isLoading && patient && (
                <div>
                    <h5>Your symptoms</h5>
                    <p>{patient.symptoms}</p>
                    <h5>Patient's Current Medication</h5>
                    {patient.currentMedicines.map(m => {
                        return(
                            <p>Name {m.medicine} Since {m.startDate}</p>
                        )
                    })}
                    <h5>Prescribed Medicines for you</h5>
                    {patient.prescribedMedicines.map(m => {
                        return(
                            <p>{m.name} till {m.duration} days</p>
                        );
                    })}
                </div>
            )}
        </React.Fragment>
    );
}

export default PatientHome;