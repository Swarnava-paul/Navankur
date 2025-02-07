import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { setUserInfo } from "../../App/appSlice";
import { useAppDispatch , useAppSelector} from "../../App/hook";

const EmployerDashBoard:React.FC = () => {

    interface createdJob{
      CompanyName : string,
      IsHiringOpen : boolean,
      JobDescription:string,
      JobTitle:string
      _id:string
    }; // this kind of data will come from backend
    const FirstName = useAppSelector((state)=>state.app.userInfo.FirstName);
    const dispatch = useAppDispatch();
    const[createdJobs,setCreatedJobs] = useState<createdJob[]>([]); // secure the state by setting type
 
    async function getUserDetails() {
        try{
          //
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URI}/user/v1/profile`,{
            headers: {
                'Authorization':`Bearer ${token}`
              }
          });
          dispatch(setUserInfo(response.data.FirstName));
        }catch(error) {
          // 
          alert('error of loading home')
        } 
    };
    async function getAllCreatedActiveJobs() {
      const token = localStorage.getItem('token');
        try{
           const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URI}/job/v1/createdJobs`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
           });
           setCreatedJobs(response.data.createdJobs);
        }catch(error){
            alert('Error During Loading Created Jobs')
        }
    };

    useEffect(()=>{
      getUserDetails();
      getAllCreatedActiveJobs();
    },[]);

    return (
    <>
    employer ds
    hello {FirstName}
    </>
    );
};

export default EmployerDashBoard;

