import React from "react";

import Patient from "./Patient";

const PatientList = (props) => {
    return(
        <React.Fragment>
        {
            props.patients.map(patient => {
                return(
                    <Patient 
                        key={patient.id}
                        id={patient.id}
                        name={patient.name}
                        startDate={patient.startDate}
                        phoneNo={patient.phoneNo}
                        city={patient.city}
                        state={patient.state}
                    />
                )
            })
        }
        </React.Fragment>
    );
}

export default PatientList;