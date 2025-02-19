import React, { useState,useEffect,useRef } from "react";
import Footer from "./footer";
import axios from "axios"
import { NavLink, replace } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useGSAP} from "@gsap/react"
import gsap from "gsap"

const Signin = () => {
const [auth,setAuth] = useState(false)
const [formData,setFormData] =useState({
  email:"",
  password:""
})

const navigate = useNavigate()

useEffect(() => {
  const tokenUser = localStorage.getItem("token-user");
  if (tokenUser) {
    navigate("/", { replace: true }); // Redirect to home if already logged in
  }
}, [navigate]);


axios.defaults.baseURL='http://localhost:4000'

const api = axios.create({
  baseURL:'http://localhost:4000'
})

const handleChange = (e) => {
 const{name,value} = e.target
 setFormData((prev) => ({
  ...prev,
  [name] : value
 }))

}




const handlesubmit = async (e) => {
e.preventDefault()
try {
 const response = await api.post("/Home/signin",formData);
 localStorage.setItem('token-user',response.data.token);
 setAuth(true);

 setFormData({
  email:"",
  password:""
 })
 
 navigate("/",{replace:true});

 //const token =response.data.token;
 //localStorage.setItem('token-user',token)

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


 return(

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
      <form className='Signup' onSubmit={handlesubmit}>
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
          <button className="login" type="submit">Login</button>  
          <NavLink to={"/signup"} >
           create new account
          </NavLink>    
      </form>
  </div>                    
</div>
<Footer/>
</div>

 )
}

export default Signin;