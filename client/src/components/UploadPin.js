import React from 'react'
import { useAppContext } from '../context/appContext'
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import { TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { videoTagString, VideoTag } from 'react-video-tag'

import Alert from "./Alert"




const UploadPin = () => {


    let {caption,category, changeFunction,clearuploads,uploadImage,uploadPin,isLoading,showAlert,vedio,deletevedio}=useAppContext()

    function handleChange(event){
        changeFunction(event)
    }

    function handleimage(event){
        uploadImage(event)
      }

      function deleteimageref(){
          let imageref=document.getElementById("standard-basic")
          if(imageref){
              imageref.value=""
            }
        deletevedio()
      }
      
    let arr=["Gaming","Development","Comedy","Food","Dance","Beauty","Animal"]
  return (
    <div className='uploadPin__Main'>
        <div className='uploadPin__Sub'>
            <h1 style={{fontSize:"30px",margin:"5px"}}>Upload Image</h1>
            <p style={{fontSize:"20px",margin:"5px"}}>Upload Image To Your Account</p>
            <div className='uploads__Main' style={{display:"flex"}}>

                <div className='upload__Image' style={{display:"flex",flexDirection:"column",marginRight:"140px",marginBottom:"40px"}}>
                
                  {vedio &&  <video  controls style={{height:"200px",width:"300px"}}>
                         <source src={vedio} type="video/mp4"/>
                   </video>
}
                    <div style={{display:'flex'}}>

                    <TextField id="standard-basic"   variant="filled"    type="file"   onChange=   {handleimage}  style={{marginTop:"40px"}} className="imageref" /> 
                    <DeleteIcon style={{color:"red",marginTop:"60px",cursor:"pointer"}} onClick={deleteimageref}/>
                    </div>
                </div>

                 <div className='upload__Inputs' >
                    {showAlert && <Alert/>}
                       <FormRow type="text" name="caption" value={caption} handleChange={handleChange} labelText="Caption"/>
                       <FormRowSelect list={arr} name="category" value={category} handleChange={handleChange} labelText="Category"/>
                     
                       <div>
                          <button className='btn' style={{marginLeft:"20px",marginRight:"20px"}} onClick={()=>clearuploads()}>Discard</button>
                          <button className='btn' disabled={isLoading} onClick={()=>uploadPin()}>{isLoading?"Uploading":"Submit"}</button>
                       </div>
                 </div>
            
            </div>

        </div>
      
    </div>
  )
}

export default UploadPin
