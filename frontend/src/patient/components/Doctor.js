import React from "react";
import DrM from '../../Photos/Dr_M.png';
import DrF from '../../Photos/Dr_F.png';
import "./Doctor.css";

const Doctor = (props) => {
    return(
        <React.Fragment>
            <div className="DocBox" style={{clear:"both"}}>                
                <div style={{float:"left"}} className="DocImg">
                    {props.gender==="Male" ? <img style={{width: 50,height: 50,borderRadius:80}} src={DrM} alt="Male Dr." /> : <img style={{width: 50,height: 50,borderRadius:80}} src={DrF} alt="Female Dr." /> }
                    <h5 style={{marginTop:25}}>{props.name}</h5>                
                </div>
                <div style={{float:"left"}}>
                    <div className="DocBio1" style={{float:"left"}}>
                        <p>Designation: {props.designation}</p>
                        <p>Email: {props.email}</p>
                        <p>Contact No.: {props.phoneNo}</p>
                        <p>Current Patients: {props.currentPatientsLength}</p>
                    </div>                    
                    <div className="DocBio2" style={{float:"left"}}>
                        <p>City: {props.city}</p>
                        <p>State: {props.state}</p>                           
                        <button className="ConsultBtn">Consult</button>         
                    </div>                                  
                </div>
            </div>
        </React.Fragment>
    );
}
export default Doctor;