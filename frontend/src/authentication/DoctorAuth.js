import React,{useState,useContext} from "react";

import "./PatientAuth.css";
import {useForm} from "../shared/hoocks/form-hook";
import Input from "../shared/components/Input";
import {AuthContext} from "../shared/context/AuthContext";
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../shared/components/validators";
import Backdrop from "../shared/UIElements/Backdrop";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";

const DoctorAuth = () => {

    const auth = useContext(AuthContext);
    const [isLogin , setIsLogin] = useState(true);
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState();

    const [designation,setDesignation] = useState("M.B.B.S");
    const [gender,setGender] = useState("Male");
    const [formState, inputHandler, setFormData] = useForm(
        {
            "email":{
                value:"",
                isValid:false
            },
            "password":{
                value:"",
                isValid:false
            }
        },
        false
    );

    const handleSwitch = () => {
        if(!isLogin){
            // Signup -> Login
            setFormData({
                ...formState.inputs,
                name:undefined,
                phoneNo:undefined,
                city:undefined,
                state:undefined,
                doctorLicense:undefined,
            },
            formState.inputs.email.isValid && formState.inputs)
        }else{
            // Login -> Signup
            setFormData(
                {
                  ...formState.inputs,
                  name: {
                    value: '',
                    isValid: false
                  },
                  phoneNo:{ 
                      value: null,
                      isValid: true
                  },
                  city: {
                    value: '',
                    isValid: false
                  },
                  state: {
                    value: '',
                    isValid: false
                  },
                  doctorLicense: {
                    value: null,
                    isValid: false
                  }
                },
                false
            );
        }
        setIsLogin(prevMode => !prevMode);
    }

    const handleGenderSelect = (event) => {
        const newGender = event.target.value;
        setGender(newGender);
    }
    const handleDesignationSelect = (event) => {
        const newDesignation = event.target.value;
        setDesignation(newDesignation);
    }
    // To handle error
    const errorHandler = () => {
        setError(null);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formState.inputs,gender);
        if(!isLogin){
            try{
                setIsLoading(true);
                const response = await fetch("http://localhost:8080/api/doctor/signup",{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name:formState.inputs.name.value,
                        email:formState.inputs.email.value,
                        password:formState.inputs.password.value,
                        phoneNo:formState.inputs.phoneNo.value,
                        city:formState.inputs.city.value,
                        state:formState.inputs.state.value,
                        doctorLicense:formState.inputs.doctorLicense.value,
                        gender:gender,
                        designation:designation
                    })
                });
                const responseData = await response.json();

                if(responseData.message){
                    throw new Error(responseData.message);
                }

                auth.login(responseData.doctor.id , responseData.token);
            }catch(err){
                console.log(err);
                setError(err.message);
            }
            setIsLoading(false);
        }else{
            try{
                setIsLoading(true);
                const response = await fetch("http://localhost:8080/api/doctor/login",{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email:formState.inputs.email.value,
                        password:formState.inputs.password.value
                    })
                });
                const responseData = await response.json();

                if(responseData.message){
                    throw new Error(responseData.message);
                }

                auth.login(responseData.doctor.id , responseData.token);
            }catch(err){
                console.log(err);
                setError(err.message);
            }
            setIsLoading(false);
        }
    }

    return(
        <React.Fragment>

            { error && (
                <React.Fragment>
                    <Backdrop onClick={errorHandler} />
                    <ErrorModal heading="Error Occured!" error={error} />
                </React.Fragment>
            )}
            { isLoading && <LoadingSpinner asOverlay />}

            <h1>Doctor {isLogin ? "Login":"Signup"}</h1>
            <form className="auth-form">

                { !isLogin && (
                    <React.Fragment>
                        <Input 
                            id="name"
                            element="input"
                            type="text"
                            label="Your Name"
                            value={formState.inputs.name.value}
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="User name is required"
                        />
                        <Input 
                            id="phoneNo"
                            element="input"
                            type="text"
                            label="Contact No."
                            value={formState.inputs.phoneNo.value}
                            onInput={inputHandler}
                            validators={[VALIDATOR_MINLENGTH(10)]}
                            errorText="Please enter a valid contact number"
                        />
                    </React.Fragment>
                )}
                <Input 
                    id="email"
                    element="input"
                    type="text"
                    label="Email"
                    value={formState.inputs.email.value}
                    onInput={inputHandler}
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address"
                />
                <Input 
                    id="password"
                    element="input"
                    type="password"
                    label="Password"
                    value={formState.inputs.password.value}
                    onInput={inputHandler}
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Please enter a password of minimum 6 characters"
                />

                {!isLogin && (
                    <React.Fragment>
                        <Input 
                            id="city"
                            element="input"
                            type="text"
                            label="City"
                            value={formState.inputs.city.value}
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="City name is required."
                        />
                        <Input 
                            id="state"
                            element="input"
                            type="text"
                            label="State"
                            value={formState.inputs.state.value}
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="State name is required."
                        />
                        <Input 
                            id="doctorLicense"
                            element="input"
                            type="text"
                            label="Your License"
                            value={formState.inputs.doctorLicense.value}
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid doctor license."
                        />
                        <label>Your Designation</label>
                        <select value={designation} onChange={handleDesignationSelect}>
                            <option value="M.D">M.D</option>
                            <option value="M.B.B.S">M.B.B.S</option>
                        </select>
                        <label>Gender</label>
                        <select value={gender} onChange={handleGenderSelect}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                    </React.Fragment>
                )}
                <button disabled={!formState.isValid} onClick={handleSubmit}>{isLogin ? "Login":"Signup"}</button>
            </form>
            <button onClick={handleSwitch}>Switch to {!isLogin ? "Login":"Signup"}</button>
        </React.Fragment>
    )
}

export default DoctorAuth;