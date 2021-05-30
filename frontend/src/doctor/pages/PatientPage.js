import React,{useState,useContext,useEffect} from "react";
import {useHistory,Link,useParams} from "react-router-dom";
import { Line } from 'react-chartjs-2';

import {AuthContext} from "../../shared/context/AuthContext";
import Backdrop from "../../shared/UIElements/Backdrop";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

const PatientPage = () => {

    const patientId = useParams().patientId;
    const auth = useContext(AuthContext);
    const history = useHistory();
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState();
    const [report, setReport] = useState();
    const [dates , setDates] = useState();
    const [selectDate , setSelectDate] = useState();

    const [stateo , setStateo] = useState({
        labels: [],
        datasets: [
          {
            label: 'SpO2',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
          }
        ]
    });
    const [stateb , setStateb] = useState({
        labels: [],
        datasets: [
          {
            label: 'temperature',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
          }
        ]
    })
    const [statep , setStatep] = useState({
        labels: [],
        datasets: [
          {
            label: 'SpO2',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
          }
        ]
    });

    // To handle error
    const errorHandler = () => {
        setError(null);
    }

    // get patient report from backend
    useEffect(() => {
        const sendRequest = async () => {
            try{
                setIsLoading(true);
                console.log(patientId);
                const response = await fetch(`http://localhost:8080/api/patient/info/${patientId}`);
                const responseData = await response.json();
                
                if(responseData.message){
                    throw new Error(responseData.message);
                }

                let reportDates=[];
                responseData.patient.reports.forEach((report) => {
                  reportDates.push(report.date)  
                });
                setDates(reportDates); 
                const xo = [];
                const yo = [];
                
                const xb = [];
                const yb = [];
                
                const xp = [];
                const yp = [];

                for (const re of responseData.patient.reports[responseData.patient.reports.length-1].oxygen) {
                    xo.push(re.time);
                    yo.push(re.level);
                }
                const newStateo = stateo;
                newStateo.labels = xo;
                newStateo.datasets[0].data = yo;
                setStateo(newStateo);
                
                for (const re of responseData.patient.reports[responseData.patient.reports.length-1].temperature) {
                    xb.push(re.time);
                    yb.push(re.level);
                }
                const newStateb = stateb;
                newStateb.labels = xb;
                newStateb.datasets[0].data = yb;
                setStateb(newStateb);
                
                for (const re of responseData.patient.reports[responseData.patient.reports.length-1].pulse) {
                    xp.push(re.time);
                    yp.push(re.level);
                }
                const newStatep = statep;
                newStatep.labels = xp;
                newStatep.datasets[0].data = yp;
                setStateo(newStatep);
                setReport(responseData.patient);
            }catch(err){
                console.log(err);
                setError(err);
            }
            setIsLoading(false);
        };
        sendRequest();
    }, []);

    const dateHandler = async (event) => {
        const newDate = event.target.value;
        setSelectDate(newDate);
        const findDateIndex = report.reports.findIndex((report) => report.date === newDate);
        const xo = [];
        const yo = [];
        
        const xb = [];
        const yb = [];
        
        const xp = [];
        const yp = [];

        for (const re of report.reports[findDateIndex].oxygen) {
            xo.push(re.time);
            yo.push(re.level);
        }
        const newStateo = stateo;
        newStateo.labels = xo;
        newStateo.datasets[0].data = yo;
        setStateo(newStateo);
        
        for (const re of report.reports[findDateIndex].temperature) {
            xb.push(re.time);
            yb.push(re.level);
        }
        const newStateb = stateb;
        newStateb.labels = xb;
        newStateb.datasets[0].data = yb;
        setStateb(newStateb);
        
        for (const re of report.reports[findDateIndex].pulse) {
            xp.push(re.time);
            yp.push(re.level);
        }
        const newStatep = statep;
        newStatep.labels = xp;
        newStatep.datasets[0].data = yp;
        setStateo(newStatep);
    }

    return (
        <React.Fragment>
            { error && (
                <React.Fragment>
                    <Backdrop onClick={errorHandler} />
                    <ErrorModal heading="Error Occured!" error={error} />
                </React.Fragment>
            )}
            { isLoading && <LoadingSpinner asOverlay />}
            { !isLoading && report && dates && (
                <React.Fragment>
                    <div>
                        <h1>Report</h1>
                        <h2>Patient Name: {report && report.name}</h2>
                        <hr />
                        <h2>Patient Problem:</h2>
                        <p>{report && report.symptoms}</p>
                        <hr />
                        <h2>Current Medicine</h2>
                        {
                            report.currentMedicines.map((med, index) => {
                                return (
                                    <div key={index}>
                                        <h1>Name: {med.medicine}</h1>
                                        <h2>Start Date: { med.startDate}</h2>
                                    </div>
                                )
                            })
                        }
                        <hr />
                        <h2>Prescribed Medicine</h2>
                        {
                            report.prescribedMedicines.map((med, index) => {
                                return (
                                    <div key={index}>
                                        <h1>Name: {med.name}</h1>
                                        <h2>morning: { med.morningBeforeB > 0 ? med.morningBeforeB : med.morningAfterB}</h2>
                                        <h2>afternoon: { med.afternoonBeforeL > 0 ? med.afternoonBeforeL : med.afternoonAfterL}</h2>
                                        <h2>evening: { med.eveningBeforeD > 0 ? med.eveningBeforeD : med.eveningAfterD}</h2>
                                    </div>
                                )
                            })
                        }
                        <button>Edit</button>
                        <hr />
                        {dates && (
                            <select value={selectDate} onChange={dateHandler}>
                                {
                                    dates.map((date) => {
                                        return(
                                            <option value={date}>{date}</option>
                                        )
                                    })
                                }
                            </select>
                        )}
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
                </React.Fragment>
            )}
             
        </React.Fragment>
    )
}

export default PatientPage;