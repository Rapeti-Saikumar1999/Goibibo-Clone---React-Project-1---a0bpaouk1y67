import React, { useState } from "react";
import "./Styles/Login.css";
import axios from "axios";
import { useAuth } from "../../Auth/AuthContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
function Login() {
  const [Email, setEmail] = useState();
  const [Pwd, setPwd] = useState();
  const [Name, setName] = useState();
  const { setIsLoggedIn } = useAuth();
  const state = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name: Name,
      email: Email,
      password: Pwd,
      appType: "bookingportals",
    };
    try {
      const res = await axios.post(
        "https://academics.newtonschool.co/api/v1/bookingportals/signup",
        user,
        { headers: { projectId: "2qduaipfjxvu" } }
      );
      const token = res.data.token;
      if (token) {
        sessionStorage.setItem("userToken", token);
        sessionStorage.setItem("userName", JSON.stringify(res.data.data.user.name));
        sessionStorage.setItem("userEmail", JSON.stringify(res.data.data.user.email));
        setIsLoggedIn(true);

        navigate("/login");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="login">
      <form action="" className="login-container" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="input-container">
          <div className="input-fileds">
            <label htmlFor="">Name</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-fileds">
            <label htmlFor="">Email</label>
            <input
              type="email"
              name=""
              id=""
              placeholder="Enter Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-fileds">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name=""
              id=""
              placeholder="Enter password"
              value={Pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
        </div>
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default Login;
