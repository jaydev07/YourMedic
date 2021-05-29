import React from "react";
import DrM from '../../Photos/Dr_M.svg';
import DrF from '../../Photos/Dr_F.svg';
import "./Doctor.css";

const Doctor = (props) => {
    return(
        <React.Fragment>            
            <div className="DocBox" class="container" style={{boxShadow:"rgba(0, 0, 0, 0.24) 2px 8px 20px",clear:"both",paddingTop:"2%",padding:"1% 3% 1%",margin:"1% 10% 1%",width:"80%"}}> 
                <div class="row">
                    <div class="col-2">
                        <div class="row">
                            {props.gender==="Male" ? <img style={{width: 80,height: 80,borderRadius:100}} src={DrM} alt="Male Dr." /> : <img style={{width: 80,height: 55,borderRadius:80}} src={DrF} alt="Female Dr." /> }
                        </div>
                        <div class="row">
                            <h5>{props.name}</h5>      
                        </div>
                    </div>                
                    <div class="col-5">
                        <div class="row">
                            <p>Designation: {props.designation}</p>
                        </div>
                        <div class="row">
                            <p>Email: {props.email}</p>
                        </div>
                        <div class="row">
                            <p>Contact No.: {props.phoneNo}</p>
                        </div>
                        <div class="row">
                            <p>Current Patients: {props.currentPatientsLength}</p>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="row">
                            <p>City: {props.city}</p>
                        </div>
                        <div class="row">
                            <p>State: {props.state}</p>                           
                        </div>
                        <button className="ConsultBtn" style={{display:"inline-block"}}>Consult</button>         
                    </div>
                </div>                
            </div>
        </React.Fragment>
    );
}
export default Doctor;
