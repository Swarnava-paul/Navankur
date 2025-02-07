import React, { useState } from "react";
import { setUserinfoForRegister , setOtpGenerating , setIsOtpGenerated}  from "../../App/appSlice";
import { useAppDispatch , useAppSelector} from "../../App/hook";
import { OTPComponent } from "../Otp";
import axios from "axios";

const RegisterPage: React.FC = () => {

  const dispatch = useAppDispatch();
  const isOtpGenerating = useAppSelector((state)=>state.app.isOtpGenerating);
  const isOtpGenerated = useAppSelector((state)=>state.app.isOtpGenerated);
  // for otp generation logic

  const [formError, setError] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Role: "",
  });
  
  async function requestOtp(Email) {
        // request otp endpoint by sending email address to server
        dispatch(setOtpGenerating());
        axios.post(`${import.meta.env.VITE_BACKEND_BASE_URI}/auth/v1/otp?email=${Email}`).then((res)=>{
             dispatch(setIsOtpGenerated());
        }).catch(function(err){
           alert('Try Again')
        }).finally(()=>{
            dispatch(setOtpGenerating());
        })
    
  }

  async function storeData(data) {
    dispatch(setUserinfoForRegister(data)); // store to redux
    await requestOtp(data.Email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let flag:boolean = false;

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const newformError = {...formError};
    for(const key in data) {
       if(data[key] === ''){
        newformError[key] = `Empty ${key} field not allowed`;
        flag = true;
       }else{
        newformError[key] = ""
        flag = false;
       }
    };
    setError(newformError);
    if(flag != true) {
       // make network request
       //console.log(data)
       storeData(data);
    }

  };

  return (
    <div className="container">
       {
        isOtpGenerated == true ? ( <OTPComponent/>)
        :('')
       }
    <h2>Register</h2>
    <form onSubmit={(event)=>handleSubmit(event)}>
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          name="FirstName"
        />
        <p className="err">{formError.FirstName}</p>
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          name="LastName"
        />
        <p className="err">{formError.LastName}</p>
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="Email"
        />
        <p className="err">{formError.Email}</p>
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="Password"
        />
        <p className="err">{formError.Password}</p>
      </div>

      <div className="form-group">
        <label>Role</label>
        <select name="Role">
          <option value="">select role</option>
          <option value="JobSeeker">Job Seeker</option>
          <option value="Employer">Employer</option>
        </select>
        <p className="err">{formError.Role}</p>
      </div>

      <button type="submit">
      {isOtpGenerating == false ? 'Register' : ''}
      {isOtpGenerating == true ? (<i className="fa-solid fa-spinner fa-spin" style={{color:'white',fontSize:"25px"}}></i>) : 
      ('')}
      </button>
    </form>

    <style>{`
      .container {
        width: 400px;
        margin: 50px auto;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background: #fff;
      }
     .err{
      color:red
     }
      h2 {
        text-align: center;
        margin-bottom: 20px;
      }
      .form-group {
        margin-bottom: 15px;
      }
      .form-group label {
        display: block;
        margin-bottom: 5px;
      }
      .form-group input,
      .form-group select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      button {
        width: 100%;
        padding: 10px;
        background: black;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      button:hover {
        background: darkblue;
      }
    `}</style>
  </div>
  );
};

export default RegisterPage;