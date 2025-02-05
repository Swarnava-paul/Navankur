import { Routes , Route } from "react-router";
import React from "react";

const AllRoutes : React.FC = () => {
  
    return (
        <Routes>
            <Route path="home">
                <Route path='jobSeeker' element={<h1>Job seeker dashboard</h1>}/>
                <Route path='employer' element={<h1>Employer dashboard</h1>}/>
            </Route>
            <Route path='/' element={<h1>Landing Page</h1>}/>
            <Route path='login' element={<h1>Login page</h1>}/>
            <Route path='register' element={<h1>Register Page</h1>}/>
        </Routes>
    )
}

export default AllRoutes;