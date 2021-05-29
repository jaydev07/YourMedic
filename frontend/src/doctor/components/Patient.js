import React from "react";

const Patient = (props) => {
    return(
        <React.Fragment>
            <div>
                <h5>Name: {props.name}</h5>
                <p>Starting Date: {props.startDate}</p>
                <p>Phone Number: {props.phoneNo}</p>
                <p>Location: {props.city}, {props.state}</p>
            </div>
        </React.Fragment>
    );
}

export default Patient;