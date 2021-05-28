import React from "react";
import {Link} from "react-router-dom";

const HomePage = () => {
    return(
        <React.Fragment>
            <Link to="/auth/doctor">
                DOCTOR
            </Link>
            <br />
            <Link to="/auth/patient">
                PATIENT
            </Link>
        </React.Fragment>
    )
}

export default HomePage;