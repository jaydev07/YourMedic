import React,{useState,useContext,useEffect} from "react";
import {useHistory,Link} from "react-router-dom";

import {AuthContext} from "../../shared/context/AuthContext";
import Backdrop from "../../shared/UIElements/Backdrop";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import PatientList from "../components/PatientList";
import BackgroungImg from '../../Photos/DrListGg.jpg';
import "./GetPatients.css";


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
                    {patients.length!==0 ? (                        
                        <p className="Title" style={{float:"left",backgroundImage: `url(${BackgroungImg})`,fontSize:"4em"}}>Patients</p>                        
                    ):(
                        <h1>No active patients</h1>
                    )}
                    <div style={{clear:"both"}}>
                        <Link to="/consultrequests">
                            <button className="NonCulPntBtn">See Nonconsulted Patients</button>
                        </Link>
                    </div>
                    {patients.length!==0 ? (
                        <PatientList patients={patients} />
                    ):null}
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default GetPatients;