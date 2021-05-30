import React from "react";
import {Link} from "react-router-dom";
import "./Patient.css";
import PntM from '../../Photos/Pnt_M.svg';
import PntF from '../../Photos/Pnt_F.svg';
import BgImg from '../../Photos/DesktopBg.png';

const Patient = (props) => {
    return(
        <React.Fragment>
            <div className="DocBox container" style={{background:"white" ,boxShadow:"rgba(0, 0, 0, 0.24) 2px 8px 20px",clear:"both",paddingTop:"2%",padding:"1% 3% 1%",margin:"1% 10% 1%",width:"80%",borderRadius:"15px"}}> 
                <div className="row">                    
                    <div className="col-2">
                        <div className="row">
                            {props.gender==="Male" ? <img style={{width: 80,height: 80,borderRadius:100}} src={PntM} alt="Male Patient" /> : <img style={{width: 80,height: 55,borderRadius:80}} src={PntF} alt="Female Patient" /> }
                        </div>
                        <div className="row">
                            <h5>{props.name}</h5>      
                        </div>
                    </div>     
                    <div className="col-5">                        
                        <div class="row">
                            <p>Starting Date: {props.startDate}</p>
                        </div>
                        <div class="row">
                            <p>Phone Number: {props.phoneNo}</p>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="row">
                            <p>Location: {props.city}, {props.state}</p>
                        </div>
                        <Link to={props.prescribedMedicines.length === 0 ? "/prescribe/medicine" : `/patient/${props.id}`}>                      
                            <button className="btn ViewBtn" style={{display:"inline-block",fontWeight:"600"}}>View</button>         
                        </Link>           
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Patient;