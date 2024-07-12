import React, { useState } from 'react'
import "./Login.css"
import axios from 'axios';
function Login() {
    const [Email,setEmail] = useState("");
    const [Pwd,setPwd] = useState("");


    const handleSubmit = async (e)=>
    {
        e.preventDefault();
        const user = {
            email:{Email},
            password:{Pwd},
            appType: "bookingportals"
        }
       try {
        const res =  await axios.post("https://academics.newtonschool.co/api/v1/bookingportals/login",{user},{headers: {'projectId': "2qduaipfjxvu"}});
        console.log(res)
       } catch (error) {
        console.log(error.message);
        
       }
    }
  return (
    <div className="login">
        <form action="" className="login-container" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-container">
        <div className="input-fileds">
            <label htmlFor="">Email</label>
            <input type="email" name="" id=""  placeholder='Enter Email' value={Email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="input-fileds">
            <label htmlFor="">Password</label>
            <input type="password" name="" id=""  placeholder='Enter password' value={Pwd} onChange={(e)=>setPwd(e.target.value)}/>
        </div>
        </div>
        <button >Submit</button>
    </form>
    </div>
  )
}

export default Login
