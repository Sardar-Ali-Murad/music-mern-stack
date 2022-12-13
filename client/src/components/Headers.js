import React from 'react'
import Logo from "../assets/images/Logo.webp"
import {useAppContext} from "../context/appContext"
import Logout from "../assets/images/Logout.jpg"
import AddIcon from '@mui/icons-material/Add';
import "./index.css"
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';

const Headers = () => {
  let {user,  logoutUser}=useAppContext()
  function log(){
    logoutUser()
  }
  return (
    <div className='headers__Big__Main' style={{height:"100px"}}>
      <div className='headers__Main'>
        <img src={Logo} style={{width:"70px",height:"70px"}}/>
        <div style={{display:"flex",marginRight:"13px"}}>
         <div style={{width:"30px",height:"40px"}}>
    
        <Link to="/uploadPin">
            <AddIcon style={{color:"black",marginRight:"100px",height:"50px",width:"50px",cursor:"pointer"}}/>
        </Link>
            
         </div>
        <img src={user.image} style={{width:"50px",height:"50px",marginLeft:"40px",marginRight:"40px"}}/>
        <img onClick={log} src={Logout} style={{width:"50px",height:"50px",borderRadius:"50%",cursor:"pointer"}}/>
        </div>
      </div>
    </div>
  )
}

export default Headers
