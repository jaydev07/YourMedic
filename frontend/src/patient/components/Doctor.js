import React from "react";

const Doctor = (props) => {
    return(
        <React.Fragment>
            <div>
                <h5>Name: {props.name}</h5>
                <p>Email: {props.email}</p>
                <p>Contact No.: {props.phoneNo}</p>
                <p>City: {props.city}</p>
                <p>State: {props.state}</p>
                {props.gender==="Male" ? "M" : "F"}
                <p>Designation: {props.designation}</p>
                <p>Current Patients: {props.currentPatientsLength}</p>
                <button>Consult</button>
                <br />
            </div>
        </React.Fragment>
    );
}

export default Doctor;