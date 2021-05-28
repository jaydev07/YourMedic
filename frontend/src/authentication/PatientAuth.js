import React,{useState} from "react";

import "./PatientAuth.css";
import {useForm} from "../shared/hoocks/form-hook";
import Input from "../shared/components/Input";
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../shared/components/validators";

const PatientAuth = () => {

    const [isLogin , setIsLogin] = useState(true);

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
                age:undefined
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
                  age: {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formState.inputs,gender);
    }

    return(
        <React.Fragment>
            <h1>Patient {isLogin ? "Login":"Signup"}</h1>
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
                            id="age"
                            element="input"
                            type="text"
                            label="Your Age"
                            value={formState.inputs.age.value}
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid age."
                        />
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

export default PatientAuth;