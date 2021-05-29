import React from "react";

import Doctor from "../components/Doctor";

const DoctorList = (props) => {
    return(
        <React.Fragment>
            {
                props.doctors.map(doctor => {
                    return(
                        <Doctor 
                            key={doctor.id}
                            name={doctor.name} 
                            email={doctor.email}
                            phoneNo={doctor.phoneNo}
                            city={doctor.city}
                            state={doctor.state}
                            gender={doctor.gender}
                            designation={doctor.designation}
                            currentPatientsLength={doctor.patientIds.length}
                        />
                    )
                })
            }
        </React.Fragment>
    );
}

export default DoctorList;