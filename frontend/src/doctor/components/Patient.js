import React from "react";
import {Link} from "react-router-dom";

const Patient = (props) => {
    return(
        <React.Fragment>
            <div>
                <Link to={props.prescribedMedicines.length === 0 ? `/prescribe/medicine/${props.id}` : `/patient/${props.id}`}>
                    <h5>Name: {props.name}</h5>
                </Link>
                <p>Starting Date: {props.startDate}</p>
                <p>Phone Number: {props.phoneNo}</p>
                <p>Location: {props.city}, {props.state}</p>
                <p>Gender: {props.gender}</p>
            </div>
        </React.Fragment>
    );
}

export default Patient;