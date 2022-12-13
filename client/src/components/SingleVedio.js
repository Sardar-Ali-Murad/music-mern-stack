import React from 'react'
import {Link,useParams} from "react-router-dom"
import { useAppContext } from '../context/appContext'
import Alert from "./Alert"
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { padding } from '@mui/system';
import FormRow from './FormRow';
import ShowAlert from "./Alert"
import ToggleButton from '@mui/material/ToggleButton';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { fabClasses } from '@mui/material';


const SingleVedio = () => {
    let {isLoading,showAlert,allPins,allPinsArray,submitReview, SinglePinReviews,
        singlePinReviews,like,singlePinSingleUserLikeStatus,  SinglePinLikedNumber,singlePinLikedNumber,   SINGLE__PIN__SINGLE__USER__LIKED__STATUS}=useAppContext()
        let [state,SetState]=React.useState(false)
        let {pinId}=useParams()

    React.useEffect(()=>{
        allPins()
        SinglePinReviews({pinId})
        SinglePinLikedNumber({pinId})
    },[state])
    
    React.useEffect(()=>{
        // singlePinSingleUserLikeStatus({pinId})
    },[])


    let currentPin=allPinsArray.find((all)=>all._id===pinId)

    let [review,setReview]=React.useState("")

    function handleChange(e){
        setReview(e.target.value)
    }

    function submit(){
        submitReview({pinId:pinId,review:review})
        SetState((pre)=>!pre)
        // SinglePinReviews({pinId})
    }

    console.log(SINGLE__PIN__SINGLE__USER__LIKED__STATUS)


    const [selected, setSelected] = React.useState(false);

    function heart(){

        like({pinId,like:!selected})
        // console.log(!selected)

    }

    // console.log(selected)
    return (
        <div style={{display:"flex"}} className="section__padding single__Vedio__Main">
        {
            currentPin &&
            <>
            <div className='vedio__Wrapper'  style={{width:"55%",height:"50vh",marginRight:"20px",display:"flex",flexDirection:"column"}}  >
           
               
                  <video className='single__Vedio__Main__Vedio'    style={{width:"400px",padding:"5px",position:"sticky",top:"0",bottom:"0"}} loop={true} autoPlay={true} muted={true}  >
                     <source src={currentPin.vedio} type="video/mp4"/>
                  </video>

                  <ToggleButton
                  style={{width:"50px"}}
                  mvalue="check"
                 selected={selected}
                   onChange={() => {
                    setSelected(!selected);
                        }
                    }
                 onClick={heart}
                    
                >
                 {!selected?<FavoriteBorderIcon />:<FavoriteIcon/>}     
              </ToggleButton>

              <p className='p__Cormorant'>{singlePinLikedNumber} Likes</p>

               
              </div>


        <div >
            <div style={{display:"flex"}}>
        <Link to={`/singleUserPins/${currentPin.userId}`}>
               <Avatar  sx={{ bgcolor: deepOrange[500] }}>{currentPin.userName.charAt(0).toUpperCase()}</Avatar>
             </Link>
             <h4 style={{marginLeft:"20px"}}>{currentPin.userName}</h4>
            </div>
                  <p >{currentPin?.caption}({currentPin.category})</p>

             <div className='Review' style={{marginTop:"60px"}}>
                {showAlert && <Alert/>}
                <FormRow type="text" name="review" value={review} handleChange={handleChange} labelText="Leave A Review"/>
                <button className='btn' onClick={submit}>Submit</button>
             </div>

             <div>
                <h5 style={{marginTop:"40px"}} className="h__Cormorant">Other`s People Reviews</h5>
                {singlePinReviews.length<1 && <h2 className='h__Sans'>This Pin Has No reviews Be the first one to do this</h2>}
                {singlePinReviews.map((all)=>{
                    return(
                        <div style={{marginBottom:"30px"}}>
                        <div style={{display:"flex"}}>

                        <Link to={`/singleUserPins/${all.userId}`}>
                             <Avatar  sx={{ bgcolor: deepOrange[500] }}>{all.userName.charAt(0).toUpperCase()}</Avatar>
                        </Link>
                      <h4 style={{marginLeft:"20px"}}>{all.userName}</h4> 
                        </div>
                        <p className='p__Cormorant' style={{marginLeft:"30px",marginBottom:"30px"}}>{all.review}</p>
                        </div>
                    )
                })}
             </div>


        </div>
     
    </>
    }

    </div>
  )
}

export default SingleVedio
