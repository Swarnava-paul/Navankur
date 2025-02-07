import { Routes , Route } from "react-router";
import React from "react";
import { Suspense } from "react";
const LandingPage = React.lazy(()=>import('../components/Pages/LandingPage'));
const RegisterPage = React.lazy(()=>import('../components/Pages/RegisterPage'));
const LoginPage = React.lazy(()=>import('../components/Pages/LoginPage'));
const EmployerDashBoard = React.lazy(()=>import('../components/Pages/Employer'));


const AllRoutes : React.FC = () => {

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
            <Route path="home">
                <Route path='jobSeeker' element={<h1>Job seeker dashboard</h1>}/>
                <Route path='employer' element={<EmployerDashBoard/>}/>
            </Route>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='login' element={<LoginPage/>}/>
            <Route path='register' element={<RegisterPage/>}/>
        </Routes>
        </Suspense>
    )
}

export default AllRoutes;