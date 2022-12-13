import React from 'react'
import { useAppContext } from '../context/appContext'
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import {Link} from "react-router-dom"
// import { Typography } from '@mui/material';
import Typography from '@mui/material/Typography';
const CurrentUserVedios = () => {
  let {currentUserPins,CurrentUserPins,delPin,CurrentUserLikedPins,currentUserLikedPins}=useAppContext()
  React.useEffect(()=>{
     CurrentUserPins()
     CurrentUserLikedPins()
  },[])

  let [state,setState]=React.useState(true)
  return (
    <div>
      <div style={{marginLeft:"35%",marginTop:"40px"}}>
        <h2>Your Vedios</h2>
        <p>Delete Any Vedio You Want</p>
      </div>

      <ButtonGroup
      style={{marginLeft:"35%"}}
      disableElevation
      variant="outlined"
      aria-label="Disabled elevation buttons"
    >
      <Button onClick={()=>setState(true)}>Created</Button>
      <Button onClick={()=>setState(false)}>Liked</Button>
    </ButtonGroup>



     {state?<div className='section__padding' style={{marginLeft:"90px"}}>
     {currentUserPins.length<1 && <Typography variant='h3'>You Have No Pins Yet!!</Typography>}

      {currentUserPins?.map((all)=>{
        return (
          <div  style={{position:"relative"}}>
            <p>{all?.caption}({all.category})</p>

            <div style={{display:"flex"}}>
            
            </div >
              <div className='vedio__Wrapper_Current__User current__User__Mian' >
               <video  controls  className='home__vedio' style={{width:"80%"}} >
                 <source src={all.vedio} type="video/mp4"/>
               </video>
               <DeleteIcon className='del__Icon' onClick={()=>delPin(all._id)}/>
               
              </div>


              </div>
         )
        })}
        </div>:
        <div className='section__padding' style={{marginLeft:"90px"}}>
           {currentUserLikedPins.length<1 && <Typography variant='h3'>You Have No Liked Pins Yet!!</Typography>}

{currentUserLikedPins?.map((all)=>{
  return (
    <div  style={{position:"relative"}}>
      <p>{all?.pin?.caption}({all?.pin?.category})</p>

      <div style={{display:"flex"}}>
      
      </div >
      <div style={{display:"flex",marginLeft:"20px"}}>
             <Link to={`/singleUserPins/${all.pin.userId}`}>
               <Avatar sx={{ bgcolor: deepOrange[500] }}>{all.pin.userName.charAt(0).toUpperCase()}</Avatar>
             </Link>

               <h4 style={{marginLeft:"20px"}}>{all.pin.userName}</h4>

    </div>
        <div className='vedio__Wrapper_Current__User current__User__Mian' >
         <video  controls  className='home__vedio' style={{width:"80%"}} >
           <source src={all.pin.vedio} type="video/mp4"/>
         </video>


            </div>
     
        </div>
   )
  })}
  </div>}
    </div>
  )
}

export default CurrentUserVedios
