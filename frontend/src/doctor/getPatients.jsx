import React, { useEffect, useState } from 'react'

export const GetPatients = () => {
    
    const [patients, setPatients] = useState();

    // get patients from backend
    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8080/api/doctor/patients/60b1d2a9fa30bd5db4ae8a64');
            const responseData = await response.json();     
            console.log(responseData);
            setPatients(responseData.patients);
        })();
    }, []);

    // * create a list of cards
    const totalPatients = patients.map(patient => {
        return (
            <div key={patient.id}>
                <h2>Name: {patient.name}</h2>
                <h4>Phone Number: {patient.phoneNo}</h4>
                <h4>Location: {patient.city}, {patient.state}</h4>
            </div>
        )
    })

    return (
        <div>
            <h1>Patients</h1>
            <hr />
            {totalPatients}
        </div>
    )
}
