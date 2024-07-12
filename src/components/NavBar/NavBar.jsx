import React, { useState } from 'react'
import "./NavBar.css"
import { NavLink } from 'react-router-dom'
import Logo from "../../Assets/logo.png"
function NavBar() {
    const [Menu,setMenu] = useState("flight")
  return (
    <div className='nav-container'>
        <NavLink onClick={()=>setMenu("flight")} to="/" style={{textDecoration:"none"}}><img src={Logo} alt="logo" id="logo"/></NavLink>
        <div className="navbar">
            <NavLink onClick={()=>setMenu("flight")}className="navlink" to="/" style={{textDecoration:"none"}}>Flights{Menu==="flight"&&<hr/>}</NavLink>
            <NavLink onClick={()=>setMenu("hotels")}className="navlink" to="/hotels" style={{textDecoration:"none"}}>Hotels{Menu==="hotels"&&<hr/>}</NavLink>
            <NavLink onClick={()=>setMenu("trains")}className="navlink" to="/trains" style={{textDecoration:"none"}}>Trains{Menu==="trains"&&<hr/>}</NavLink>
            <NavLink onClick={()=>setMenu("bus")}className="navlink" to="/bus" style={{textDecoration:"none"}}>Bus{Menu==="bus"&&<hr/>}</NavLink>
            <NavLink onClick={()=>setMenu("mytrips")}className="navlink mytrips-history-btn" to="/mytrips" style={{textDecoration:"none"}}><p className='mytrips'>MyTrips</p><p>Manage Bookings</p>{Menu==="mytrips"&&<hr/>}</NavLink>
        </div>
        <div className='profile'>
            <NavLink to="/login"  style={{textDecoration:"none"}}>Login</NavLink>
        </div>
      
    </div>
  )
}

export default NavBar
