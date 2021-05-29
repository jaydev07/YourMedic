import React, { useState } from 'react'

function Prescribe(id, patiendId) {
    
    const [medicines, setMedicines] = useState([]);
    const [morning, setMorning] = useState('morningbefore');
    const [afternoon, setAfternoon] = useState('afternoonbefore');
    const [evening, setEvening] = useState('eveningbefore');

    const medicine = {
        name: '',
        duration: 0,
        quantity: 0,
        time: {
            morningBefore: 0,
            morningAfter: 0,
            afternoonBefore: 0,
            afternoonAfter: 0,
            eveningBefore: 0,
            eveningAfter: 0
        }
    }

    function addMedicine(){
        setMedicines([...medicines, medicine]);
    }

    function handleClick(e, index) {
        if (e.target.id === 'name') {
            const newMed = [...medicines];
            newMed[index].name = e.target.value;
            setMedicines(newMed);
        }
        if (e.target.id === 'duration') {
            const newMed = [...medicines];
            newMed[index].duration = Number(e.target.value);
            setMedicines(newMed);
        }
        if (e.target.id === 'quantity') {
            const newMed = [...medicines];
            newMed[index].quantity = Number(e.target.value);
            setMedicines(newMed);
        }
        if (e.target.id === 'morning') {
            if (morning === 'morningbefore') {
                const newMed = [...medicines];
                newMed[index].time.morningBefore = Number(e.target.value);
                newMed[index].time.morningAfter = 0;
                setMedicines(newMed);
                
            } else {
                const newMed = [...medicines];
                newMed[index].time.morningAfter = Number(e.target.value);
                newMed[index].time.morningBefore = 0;
                setMedicines(newMed);
            }
        }
        if (e.target.id === 'afternoon') {
            if (afternoon === 'afternoonbefore') {
                const newMed = [...medicines];
                newMed[index].time.afternoonBefore = Number(e.target.value);
                newMed[index].time.afternoonAfter = 0;
                setMedicines(newMed);
                
            } else {
                const newMed = [...medicines];
                newMed[index].time.afternoonAfter = Number(e.target.value);
                newMed[index].time.afternoonBefore = 0;
                setMedicines(newMed);
            }
        }
        if (e.target.id === 'evening') {
            if (evening === 'eveningbefore') {
                const newMed = [...medicines];
                newMed[index].time.eveningBefore = Number(e.target.value);
                newMed[index].time.eveningAfter = 0;
                setMedicines(newMed);
                
            } else {
                const newMed = [...medicines];
                newMed[index].time.eveningAfter = Number(e.target.value);
                newMed[index].time.eveningBefore = 0;
                setMedicines(newMed);
            }
        }
        
        console.log(medicines);
    }

    const PrescribeMed = medicines.map((med, index) => {
        return (
            <div key={index}>
                <form>
                    <label>Medicine Name</label>
                    <br />
                    <input type="text" id="name" value={med.name} onChange={(e) => handleClick(e, index)}/>
                    <br />
                    <label>Duration</label>
                    <br />
                    <input type="number" id="duration" value={med.duration} onChange={(e) => handleClick(e, index)}/>
                    <br />
                    <label>quantity</label>
                    <br />
                    <input type="number" id="quantity" value={med.quantity} onChange={(e) => handleClick(e, index)}/>
                    <br />
                    <label>Morning</label>
                    <br />
                    <br />
                    <select value={morning} onChange={(e) => setMorning(e.target.value)}>
                        <option value="morningbefore">Before BreadFast</option>
                        <option value="morningafter">After BreadFast</option>
                    </select>
                    <br />
                    <input 
                    type="number" 
                    id="morning" value={morning === 'morningbefore' ? med.time.morningBefore : med.time.morningAfter} 
                    onChange={(e) => handleClick(e, index)}
                    />
                    <br />
                    <label>Afternoon</label>
                    <br />
                    <br />
                    <select value={afternoon} onChange={(e) => setAfternoon(e.target.value)}>
                        <option value="afternoonbefore">Before Lunch</option>
                        <option value="afternoonafter">After Lunch</option>
                    </select>
                    <br />
                    <input 
                    type="number" 
                    id="morning" value={afternoon === 'afternoonbefore' ? med.time.afternoonBefore : med.time.afternoonAfter} 
                    onChange={(e) => handleClick(e, index)}
                    />
                    <br />
                    <label>Evening</label>
                    <br />
                    <br />
                    <select value={evening} onChange={(e) => setEvening(e.target.value)}>
                        <option value="eveningbefore">Before Dinner</option>
                        <option value="eveningafter">After Dinner</option>
                    </select>
                    <br />
                    <input 
                    type="number" 
                    id="morning" value={evening === 'eveningbefore' ? med.time.eveningBefore : med.time.eveningAfter} 
                    onChange={(e) => handleClick(e, index)}
                    />
                    <br />

                </form>
            </div>
        )
    })

    return (
        <div>
            <h1>Medicines</h1> 
            <br />       
            <br />
            {PrescribeMed}
            <button onClick={addMedicine}>+</button>
            <br />
            <hr />
            <button onClick={e => console.log(medicines)}>Submit</button>       
        </div>
    )
}

export default Prescribe