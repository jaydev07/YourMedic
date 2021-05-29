import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';

function GetReport(pid) {

    const [report, setReport] = useState();


    // get patient report from backend
    useEffect(() => {
        const sendRequest = async () => {
            try{
                // const response = await fetch(`http://localhost:8080/api/patient/info/${pid}`);
                const response = await fetch(`http://localhost:8080/api/patient/info/60b1d1e5bc812b2354931579`);
                const responseData = await response.json();
                
                if(responseData.message){
                    throw new Error(responseData.message);
                }
                setReport(responseData.patient);
            }catch(err){
                console.log(err);
            }
        };
        sendRequest();
    }, []);

    const currentMedicines = report.currentMedicines.map((med, index) => {
        return (
            <div key={index}>
                <h1>Name: {med.medicine}</h1>
                <h2>Start Date: { med.startDate}</h2>
            </div>
        )
    })
    
    const prescribedMedines = report.prescribedMedicines.map((med, index) => {
        return (
            <div key={index}>
                <h1>Name: {med.name}</h1>
                <h2>morning: { med.morningBeforeB > 0 ? med.morningBeforeB : med.morningAfterB}</h2>
                <h2>afternoon: { med.afternoonBeforeL > 0 ? med.afternoonBeforeL : med.afternoonAfterL}</h2>
                <h2>evening: { med.eveningBeforeD > 0 ? med.eveningBeforeD : med.eveningAfterD}</h2>
            </div>
        )
    })

    
    if (report) {
        for (const re of report.reports) {
            
        }
    }

    const xo = [];
    const yo = [];
    
    const xb = [];
    const yb = [];
    
    const xp = [];
    const yp = [];

    for (const re of report.reports[0].oxygen) {
        xo.push(re.time);
        yo.push(re.level);
    }
    
    for (const re of report.reports[0].temperature) {
        xb.push(re.time);
        yb.push(re.level);
    }
    
    for (const re of report.reports[0].pulse) {
        xp.push(re.time);
        yp.push(re.level);
    }
            
    const stateo = {
        labels: xo,
        datasets: [
          {
            label: 'SpO2',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: yo
          }
        ]
    }
    
    const stateb = {
        labels: xb,
        datasets: [
          {
            label: 'temperature',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: yb
          }
        ]
    }
    
    const statep = {
        labels: xb,
        datasets: [
          {
            label: 'SpO2',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: yb
          }
        ]
    }

    return (
        <div>
            {console.log(report)}
            <h1>Report</h1>
            <h2>Patient Name: {report && report.name}</h2>
            <hr />
            <h2>Patient Problem:</h2>
            <p>{report && report.symptoms}</p>
            <hr />
            <h2>Current Medicine</h2>
            {report &&  report.currentMedicines.length !== 0 && currentMedicines}
            <hr />
            <h2>Prescribed Medicine</h2>
            {report &&  report.prescribedMedicines.length !== 0 && prescribedMedines}
            <button>Edit</button>
            <hr />
            <h2>SpO2 Level</h2>
            <Line
                data={stateo}
                options={{
                    title:{
                    display:true,
                    text:'Average SpO2 level per day',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
            />
            <hr />
            <h2>Body Temperature</h2>
            <Line
                data={stateb}
                options={{
                    title:{
                    display:true,
                    text:'Average SpO2 level per day',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
            />
            <hr />
            <h2>Pulse</h2>
            <Line
                data={statep}
                options={{
                    title:{
                    display:true,
                    text:'Average SpO2 level per day',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
            />
            </div> 
    )
}

export default GetReport;

