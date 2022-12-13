import React from 'react'
import Headers from './Headers'
import HomeIcon from '@mui/icons-material/Home';
import {array} from "../utils.js"
import Chip from '@mui/material/Chip';
import { useAppContext } from '../context/appContext';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import {Link} from "react-router-dom"

const Home = () => {
  let { changeFilterCategory,allPins,allPinsArray,  filterCategory}=useAppContext()

  React.useEffect(()=>{
     allPins()
  },[ filterCategory])

  function change(text){
    changeFilterCategory(text)

  }
  return (
    <div style={{padding:"0px 4rem"}}>
      <Headers/>
     

      <div className="home__Main" style={{display:"flex"}}>
        <div className='home__Sidebar' style={{marginRight:"80px"}}>
          <Link to="/currentUserVedios">
             <HomeIcon fontSize='large' style={{cursor:"pointer",borderBottom:"2px solid red"}}/>
          </Link>

           <div>
              <p>Most Important Topics</p>
              <div className='home__Categories' style={{display:"flex",flexWrap:"wrap"}}>
              <Chip onClick={()=> change("all")} label="All" style={{marginRight:"16px",marginTop:"13px",cursor:"pointer"}}/>
                   {array.map((all)=>{
                      return   <Chip icon={all.icon} onClick={()=> change(all.text)} label={all.text} style={{marginRight:"16px",marginTop:"13px",cursor:"pointer"}}/>
                   })}
              </div>
           </div>
        </div>

        <div className='home__Vedios'>
        {allPinsArray?.map((all)=>{
          return (
            <div>

            <div style={{display:"flex",marginLeft:"20px"}}>
             <Link to={`/singleUserPins/${all.userId}`}>
               <Avatar sx={{ bgcolor: deepOrange[500] }}>{all.userName.charAt(0).toUpperCase()}</Avatar>
             </Link>

               <h4 style={{marginLeft:"20px"}}>{all.userName}</h4>

            </div>

            <p style={{marginLeft:"20px"}}>{all?.caption}({all.category})</p>

              <div className='vedio__Wrapper' style={{padding:"0px 24px"}}>
                <Link to={`/singleVedio/${all._id}`}>
                <p style={{fontSize:"15px"}}>See Details</p>
                </Link>
                  <video onClick={(e)=>e.stopPropagation()} style={{width:"100%"}}  controls  className='home__vedio' >
                     <source src={all.vedio} type="video/mp4"/>
                  </video>
               
              </div>


              </div>
         )
         })}
        </div>

      </div>
    </div>
  )
}

export default Home
