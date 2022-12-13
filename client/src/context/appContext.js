import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  UPLOAD_IMAGE,
  HANDLE_CHANGE,
  CLEAR_UPLOADS,
  CHANGE_PAGE,
  UPLOAD_IMAGE_REGISTER,
  SUBMIT_PIN_BEGIN,
  SUBMIT_PIN_ERROR,
  SUBMIT_PIN_SUCCESS,
  DELETE_VEDIO,
  CHANGE_FILTER_CATEGORY,
  GET_ALL_PINS,
  GET_CURRENT_USER__PINS,
  GET_SINGLE_USER_PINS,
  SUBMIT_REVIEW_BEGIN,
  SUBMIT_REVIEW_ERROR,
  SUBMIT_REVIEW_SUCCESS,
  SINGLE_PIN_REVIEWS,
  SINGLE_PIN_SINGLE_USER_LIKED_STATUS,
  SINGLE_PIN_LIKED_NUMBER,
  CURRENT_USER_LIKED_PINS,
  SINGLE_USER_LIKED_PINS
 
} from './actions'
import { dividerClasses, typographyClasses } from '@mui/material'


const token = localStorage.getItem('token')
const user = localStorage.getItem('user')


const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  vedio:"",
  totalPages:1,
  page:1,
  registerImage:"",
  caption:""
  ,
  category:"",
  filterCategory:"all",
  allPinsArray:[],
  currentUserPins:[],
  singleUserPins:[],
  singleUserPinsImage:"",
  singleUserPinsName:"",
  singlePinReviews:[],
  SINGLE__PIN__SINGLE__USER__LIKED__STATUS:false,
  singlePinLikedNumber:0,
  singleUserLikedPins:[],
  currentUserLikedPins:[]

}


const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  // console.log(state.registerImage)

  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

      const { user, token } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  

  function logoutUser(){
    dispatch({type:LOGOUT_USER})
    removeUserFromLocalStorage()
  }



  const uploadImage=async (event)=>{
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('image',imageFile)
    try {
    //  const {data:{image:{src}}} = await axios.post("/api/v1/post/upload"

     const {data:{image:{src}}} = await authFetch.post("/pins/upload"
    
     ,formData,{
      headers:{
       'Content-Type':'multipart/form-data'
      }
     }
     )
     dispatch({type:UPLOAD_IMAGE,
      payload:{
        image:src
      }
    })

    console.log(src)
    } catch (error) {
      
     console.log(error.response.data.msg);
    }
  }

  const uploadImageForRegister=async (event)=>{
    const imageFile = event.target.files[0];
    console.log(imageFile)
    const formData = new FormData();
    formData.append('image',imageFile)
    try {
    //  const {data:{image:{src}}} = await axios.post("/api/v1/post/upload"

     const {data:{image:{src}}} = await authFetch.post("/auth/registerUploadImage"
    
     ,formData,{
      headers:{
       'Content-Type':'multipart/form-data'
      }
     }
     )
     dispatch({type:UPLOAD_IMAGE_REGISTER,
      payload:{
        image:src
      }
    })

    console.log(src)
    } catch (error) {
      
     console.log(error.response.data.msg);
    }
  }



  const uploadPin=async ()=>{
    dispatch({type:SUBMIT_PIN_BEGIN})

    try {
      let {data}=await authFetch.post("/pins",{caption:state.caption,category:state.category,vedio:state.vedio})

      dispatch({type:SUBMIT_PIN_SUCCESS})
    } catch (error) {
      dispatch({type:SUBMIT_PIN_ERROR,payload:{
        msg:error.response.data.msg
      }})
    }

    clearAlert()
  }

  function deletevedio(){
    dispatch({type:DELETE_VEDIO})
  }

  function changeFilterCategory(category){
       dispatch({type:CHANGE_FILTER_CATEGORY,payload:{data:category}})
      //  allPins()
  }
  
  const allPins=async ()=>{
    let obj={data:"avsg"}
    try {
      let {data}=await authFetch.get(`/pins?category=${state.filterCategory}`)
      // console.log(data)
      dispatch({type:GET_ALL_PINS,payload:{data:data.allPins}})
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  const CurrentUserPins= async ()=>{

    try {
      let {data}=await authFetch.get("/pins/currentUserPins")
      dispatch({type:GET_CURRENT_USER__PINS,payload:{data:data.pins}})
    } catch (error) {
      console.log(error.response.data.msg)
      
    }
  }
  
  const delPin=async (id)=>{
    try {
      await authFetch.delete(`pins/delete/${id}`)
    } catch (error) {
      
      console.log(error.response.data.msg)
    }
    CurrentUserPins()
  }


  const SingleUserPins=async ({id})=>{
    try {
      let {data}=await authFetch(`/pins/singleUserPins/${id}`)
      dispatch({type:GET_SINGLE_USER_PINS,payload:{pins:data.userPins.pins,image:data.image,name:data.name}})
      // console.log(data)
    } catch (error) {
      console.log(error.response.data.msg)
      
    }
  }
  

  
  const SinglePinReviews=async ({pinId})=>{
    try {
          let {data}=await authFetch(`/reviews/${pinId}`)
          dispatch({type:SINGLE_PIN_REVIEWS,payload:{data:data.Reviews}})
          console.log(data)
        } catch (error) {
          console.log(error.response.data.msg)
        }
  }

  const submitReview=async ({pinId,review})=>{
    dispatch({type:SUBMIT_REVIEW_BEGIN})

    try {
      await authFetch.post("/reviews",{pinId,review})
       dispatch({type:SUBMIT_REVIEW_SUCCESS})
    } catch (error) {
      
      console.log(error.response.data.msg)
       dispatch({type:SUBMIT_REVIEW_ERROR,payload:{msg:error.response.data.msg}})
    }

    clearAlert()
    SinglePinReviews({pinId})
  }
  const singlePinLikesNumber=async ({pinId})=>{
    try {
      let {data}=await authFetch.get(`/pins/likes/singlePinLikes/${pinId}`)
    } catch (error) {
      console.log(error.response.data.msg)
      
    }
  }
  
  
  
  const like=async ({like,pinId})=>{
    try {
      await authFetch.post("/pins/likes",{pinId,like})
       } catch (error) {
        console.log(error.response.data.msg)
      }
      singlePinSingleUserLikeStatus({pinId})
      SinglePinLikedNumber({pinId})
    }

    
      const SinglePinLikedNumber=async ({pinId})=>{
        try {
          let {data}=await authFetch.get(`pins/likes/singlePinLikes/${pinId}`)
          dispatch({type:SINGLE_PIN_LIKED_NUMBER,payload:{data:data.Number}})
          console.log(data)
        } catch (error) {
          console.log(error.response.data.msg)
        }
      }
      
  const SingleUserLikedPins=async ({userId})=>{
    try {
      let {data}=await authFetch.get(`/pins/likes/singleuserLikes/${userId}`)
      dispatch({type:SINGLE_USER_LIKED_PINS,payload:{data:data.likedPins}})
      console.log(data)
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }


  
  
  
  const CurrentUserLikedPins=async ()=>{
    try {
      let {data}=await authFetch.get(`pins/likes/currentUserLikes`)
      dispatch({type:CURRENT_USER_LIKED_PINS,payload:{data:data.likedPins}})
      console.log(data)
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }
  
  const singlePinSingleUserLikeStatus=async ({pinId})=>{
    try {
       let {data}=await authFetch(`/pins/likes/singlePinSingleUserLikeStatus/${pinId}`,)
       console.log(data)
       dispatch({type:SINGLE_PIN_SINGLE_USER_LIKED_STATUS,payload:{data:data.like}})
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  function changeFunction(e){
    dispatch({type:HANDLE_CHANGE,
    payload:{
      name:e.target.name,
      value:e.target.value
    }})
  }


  function clearuploads(){
    dispatch({type:CLEAR_UPLOADS})
  }



  function changepage(page){
      dispatch({type:CHANGE_PAGE,payload:{page:page}})
  }


  
 




  

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        uploadImage,
        changeFunction,
        clearuploads,
        changepage,
        uploadImageForRegister,
        uploadPin,
        deletevedio,
        changeFilterCategory,
        allPins,
        CurrentUserPins,
        delPin,
        SingleUserPins
        ,submitReview,
        SinglePinReviews,
        like,
        singlePinSingleUserLikeStatus,
        CurrentUserLikedPins,
        SinglePinLikedNumber,
        SingleUserLikedPins    
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
