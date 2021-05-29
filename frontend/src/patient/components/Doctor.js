import React from "react";
import DrM from '../../Photos/Dr_M.png';
import DrF from '../../Photos/Dr_F.png';

const Doctor = (props) => {
    return(
        <React.Fragment>
            <div m2 text-center>                
                <div style={{float:"left",marginLeft:300}}>
                    {props.gender==="Male" ? <img style={{width: 50,height: 50,borderRadius:80}} src={DrM} alt="Male Dr." /> : <img style={{width: 50,height: 50,borderRadius:80}} src={DrF} alt="Female Dr." /> }
                    <h5>Name: {props.name}</h5>                
                </div>
                <div style={{marginLeft:300}}>
                    <div style={{float:"left"}}>
                        <p>Designation: {props.designation}</p>
                        <p>Email: {props.email}</p>
                        <p>Contact No.: {props.phoneNo}</p>
                        <p>Current Patients: {props.currentPatientsLength}</p>
                    </div>
                    <div style={{marginLeft:20,float:"left"}}>
                        <p>City: {props.city}</p>
                        <p>State: {props.state}</p>                           
                        <button>Consult</button>         
                    </div>                                  
                </div>
            </div>
        </React.Fragment>
    );
}

export default Doctor;