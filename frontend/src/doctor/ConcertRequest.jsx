import React, { useEffect, useState } from 'react'

export const ConcertRequest = () => {

    const [requests, setRequests] = useState([]);

    // get requests from backend
    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8080/api/doctor/nonConsulted/patients/60b1d2a9fa30bd5db4ae8a64');
            const responseData = await response.json();     
            console.log(responseData);
            setRequests(responseData.patients);
        })();
    }, []);

    function Accept(id) {
        console.log('id', id);
    }
    
    function Reject(id) {
        console.log('id', id);
    }

    // * create a list of cards
    const totalRequests = requests.map(patient => {
        return (
            <div key={patient.id}>
                <h2>Name: {patient.name}</h2>
                <h5>Starting Date: {patient.startDate}</h5>
                <h4>Phone Number: {patient.phoneNo}</h4>
                <h4>Location: {patient.city}, {patient.state}</h4>
                <button onClick={() => Accept(patient.id)}>Accept</button>
                <button onClick={() => Reject(patient.id)}>Reject</button>
            </div>
        )
    })

    return (
        <div>
            <h1>Concert Request</h1>
            <hr />
            {totalRequests}
        </div>
    )

}
