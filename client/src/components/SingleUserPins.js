import React from 'react'
import { useAppContext } from '../context/appContext'
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

import {Link,useParams} from "react-router-dom"


const SingleUserPins = () => {

  let [state,setState]=React.useState(true)

    let {id}=useParams()
    let {SingleUserPins,singleUserPins,singleUserPinsImage,singleUserPinsName,  SingleUserLikedPins,singleUserLikedPins   }=useAppContext()
    // console.log(id)

    React.useEffect(()=>{
       SingleUserPins({id})
       SingleUserLikedPins({userId:id})
    },[])
  return (
    <div>
      <img src={singleUserPinsImage} style={{marginLeft:"42%",marginTop:"20px",marginBottom:"40px"}}/>
        <h4 style={{marginLeft:"43%"}}>{singleUserPinsName}</h4>

        <ButtonGroup
      style={{marginLeft:"40%"}}
      disableElevation
      variant="outlined"
      aria-label="Disabled elevation buttons"
    >
      <Button onClick={()=>setState(true)}>Created</Button>
      <Button onClick={()=>setState(false)}>Liked</Button>
    </ButtonGroup>
      

    {state ?  <div className='section__padding' style={{marginLeft:"90px"}}>
    {singleUserPins.length<1 && <Typography variant='h3'>This User Have No Pins Yet!!</Typography>}

{singleUserPins?.map((all)=>{
  return (
    <div  style={{position:"relative"}}>
      <p>{all?.caption}({all.category})</p>

      <div style={{display:"flex"}}>
      
      </div >
        <div className='vedio__Wrapper_Current__User current__User__Mian' >
         <video  controls  className='home__vedio' style={{width:"80%"}} >
           <source src={all.vedio} type="video/mp4"/>
         </video>
     
         
        </div>


        </div>
   )
  })}
  </div>:
   <div className='section__padding' style={{marginLeft:"90px"}}>
      {singleUserPins.length<1 && <Typography variant='h3'>This User Have No Liked Pins Yet!!</Typography>}

   {singleUserLikedPins?.map((all)=>{
     return (
       <div  >
         
           <div style={{display:"flex",}}>
                    <Link to={`/singleUserPins/${all.pin.userId}`}>
                       <Avatar sx={{ bgcolor: deepOrange[500] }}>{all.pin.userName.charAt(0).toUpperCase()}</Avatar>
                    </Link>

                   <h4 style={{marginLeft:"20px"}}>{all.pin.userName}</h4>

             </div>


         <p>{all?.pin.caption}({all.pin.category})</p>
   
         <div style={{display:"flex"}}>
         </div >
           <div className='vedio__Wrapper_Current__User current__User__Mian' >
            <video  controls  className='home__vedio' style={{width:"80%"}} >
              <source src={all.pin.vedio} type="video/mp4"/>
            </video>
        
            
           </div>

   
   
           </div>
      )
     })}
     </div>

}
    </div>
  )
}

export default SingleUserPins
