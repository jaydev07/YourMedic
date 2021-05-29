import React,{useState,useContext} from "react";
import {useHistory} from "react-router-dom";

import {AuthContext} from "../../shared/context/AuthContext";
import Backdrop from "../../shared/UIElements/Backdrop";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

const AddSymptoms = () => {

    const auth = useContext(AuthContext);
    const history = useHistory();
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState();

    const [showMedicineTags , setShowMedicineTags] = useState(false);
    const [symptoms,setSymptoms] = useState('');
    const [currentMedicines , setCurrentMedicines] = useState([]);

    const changeMedicineHandler = (event) => {
        const index = event.target.name;
        const change = event.target.className;
        const value = event.target.value;
        setCurrentMedicines(prev => {
            if(change === "medicine"){
                prev[index] = {
                    medicine:value,
                    startDate:prev[index].startDate
                }
            }else{
                prev[index] = {
                    medicine:prev[index].medicine,
                    startDate:value
                }
            }
            
            return [...prev]
        })  
    }

    const symptomsHandler = (event) => {
        const newSymptoms = event.target.value;
        setSymptoms(newSymptoms);
    }

    const addMedicineHandler = (event) => {
        event.preventDefault();
        const newCurrentMedicines = [...currentMedicines];
        newCurrentMedicines.push({
            medicine:"",
            startDate:""
        });
        setCurrentMedicines(newCurrentMedicines);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(symptoms,currentMedicines);
        try{
            setIsLoading(true);
            const response = await fetch(`http://localhost:8080/api/patient/addSymptomDetails/${auth.userId}`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    symptoms:symptoms,
                    currentMedicines:currentMedicines
                })
            });
            const responseData = await response.json();
            if(responseData.message){
                throw new Error(responseData.message);
            }
            history.push("/showalldoctors");
        }catch(err){
            console.log(err);
            setError(err.message);
        }
        setIsLoading(false);
    }

    const showCurrentMedication = (event) => {
        event.preventDefault();
        setCurrentMedicines([
            {
                medicine:"",
                startDate:""
            },
            {
                medicine:"",
                startDate:""
            }
        ]);
        setShowMedicineTags(true);
    }

    const errorHandler = () => {
        setError(null);
    }

    return(
        <React.Fragment>
            { error && (
                <React.Fragment>
                    <Backdrop onClick={errorHandler} />
                    <ErrorModal heading="Error Occured!" error={error} />
                </React.Fragment>
            )}
            { isLoading && <LoadingSpinner asOverlay />}

            <form>
                <h4>Your Problem/Symptoms</h4>
                <textarea rows="3" value={symptoms} placeholder="Having cold,cough & fever ..." onChange={symptomsHandler}></textarea>

                <h4>Are you having diseases like Asthama or Cancer</h4>
                <button onClick={showCurrentMedication}>Yes</button>
                { showMedicineTags && (
                    <div>
                        <h6>Include your current medications for those diseases</h6>
                        {
                            currentMedicines.map((med,index) => {
                                return(
                                    <div key={index}>
                                        <input 
                                            className="medicine" 
                                            type="text" 
                                            placeholder="Medicine Name" 
                                            name={index} 
                                            value={med.medicine} 
                                            onChange={changeMedicineHandler}
                                        />
                                        <label>Since</label>
                                        <input 
                                            className="date"
                                            type="date"
                                            name={index}
                                            value={med.startDate}
                                            onChange={changeMedicineHandler}
                                        />
                                    </div>
                                )
                            })
                        }
                        <button id="add-btn" onClick={addMedicineHandler}>Add</button>
                    </div>
                )}
                <button onClick={submitHandler} disabled={symptoms.length === 0 ? true:false}>Submit</button>
            </form> 
        </React.Fragment>
    );
}

export default AddSymptoms;