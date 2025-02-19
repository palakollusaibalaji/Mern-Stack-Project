import React, { useState,useRef } from 'react';
import Footer from './footer';
import { NavLink } from 'react-router-dom';
import axios, {Axios} from "axios"
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from "gsap"

function Signup() {
    
    const [formData,setFormData] =useState({
        userName: "",
        email:"",
        password:""
    })

  const handleChange = (e) => {
  const {name,value} = e.target
  setFormData((pre) => ({
    ...pre,
    [name]:value
  }))
  }

 const navigate = useNavigate();

 axios.defaults.baseURL = 'http://localhost:4000'

 const api = axios.create({
    baseURL: 'http://localhost:4000'
  });

  const handlesubmit = async (e) => {
     e.preventDefault()
     try{
        const response = await api.post("/Home/signup",formData)
        console.log("succesful response : ",response.data)
        navigate('/signin');
     }catch(error){
        console.error("Error during signup:", error.response?.data || error.message);
     }
  }

  const animationLoginAndSigninPage = useRef(null)

let t1 = gsap.timeline();

useGSAP(() => {

  t1.from(".welcome",{
    y:130,
    duration:1,
    opacity:0,
    delay:0.8,
    stagger:0.5,
   // repeat:-1,
   // yoyo:true,
  });

  t1.from(animationLoginAndSigninPage.current,{
    y:130,
    duration:1,
    opacity:0,
    delay:0.8,
    stagger:0.5,
   // repeat:-1,
   // yoyo:true,
  });
},[]);



    return (
        <div className='Signup-WholeDivPage'>
            <div className='SignupPage'>
            <div className="container">
                <h1 className="welcome">
                WELCOME 
                </h1>
                <h1 ref={animationLoginAndSigninPage}>
                LOGIN OR SIGNIN 
                </h1>
            </div>
            <div className='Signup-div'>
                <form className='Signup' onSubmit={handlesubmit} method='post'>
                    <label htmlFor="userName">
                    <h3>UserName</h3>
                    <input type="text" name="userName" 
                    id="userName" 
                    placeholder='UserName'
                    className='Username'
                    value={formData.userName}
                    onChange={handleChange}
                    />
                    </label>

                    <label htmlFor="email">
                    <h3>Email</h3>
                    <input type="email" 
                    name="email" 
                    id="email" 
                    placeholder='Email' 
                    className='Email'
                    value={formData.email}
                    onChange={handleChange}
                    />
                    </label>

                    <label htmlFor="password">
                    <h3>Password</h3>
                    <input type="password" 
                    name="password" 
                    id="password" 
                    placeholder='Password'
                    className='Password'
                    value={formData.password}
                    onChange={handleChange}
                    />
                    </label>          
                    <button className='Signin-button' type='submit'>Signin</button>
                    <NavLink to={"/signin"}>
                        already have an account?signin
                    </NavLink>
                </form>
            </div>
        </div>
        <Footer/>
        </div>

    );
}

export default Signup;