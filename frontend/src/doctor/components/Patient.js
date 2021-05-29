import React from "react";
import {Link} from "react-router-dom";

const Patient = (props) => {
    return(
        <React.Fragment>
            <Link to={props.prescribedMedicines.length === 0 ? "/prescribe/medicine" : `/patient/${props.id}`}>
                <h5>Name: {props.name}</h5>
                <p>Starting Date: {props.startDate}</p>
                <p>Phone Number: {props.phoneNo}</p>
                <p>Location: {props.city}, {props.state}</p>
                <p>Gender: {props.gender}</p>
            </Link>
        </React.Fragment>
    );
}

export default Patient;