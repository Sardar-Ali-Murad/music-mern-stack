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
  SINGLE_USER_LIKED_PINS,
  CURRENT_USER_LIKED_PINS

} from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if(action.type===LOGOUT_USER){
    return{
      ...initialState,
      token:null,
      user:null
    }
  }

  if(action.type===UPLOAD_IMAGE){
    return{
      ...state,
      vedio:action.payload.image
    }
  }

  if(action.type===UPLOAD_IMAGE_REGISTER){
    return{
      ...state,
      registerImage:action.payload.image
    }
  }

  if(action.type===HANDLE_CHANGE){
    return{
      ...state,
      [action.payload.name]:action.payload.value
    }
  }

  if(action.type===CLEAR_UPLOADS){
    return{
      ...state,
        caption:"",
        category:""
    }
  }


  if(action.type===CHANGE_PAGE){
    return{
      ...state,
      page:action.payload.page
    }
  }

  if(action.type===SUBMIT_PIN_BEGIN){
    return{
      ...state,
      isLoading:true
    }
  }


  if(action.type===SUBMIT_PIN_SUCCESS){
   return{
    ...state,
    isLoading:false,
    showAlert:true,
    alertType:"success",
    alertText:"The Post is subbmited successfully"
   }

  }


  if(action.type===SUBMIT_PIN_ERROR){
   return{
    ...state,
    isLoading:false,
    showAlert:true,
    alertType:"danger",
    alertText:action.payload.msg
   }

  }

  if(action.type===DELETE_VEDIO){
    return{
      ...state,
      vedio:""
    }
  }

  if(action.type===CHANGE_FILTER_CATEGORY){
    return{
      ...state,
      filterCategory:action.payload.data
    }
  }

  if(action.type===GET_ALL_PINS){
    return{
       ...state,
       allPinsArray:action.payload.data
    }
  }

  if(action.type===GET_CURRENT_USER__PINS){
    return{
      ...state,
      currentUserPins:action.payload.data
    }
  }

  if(action.type===GET_SINGLE_USER_PINS){
    return{
      ...state,
      singleUserPins:action.payload.pins,
      singleUserPinsImage:action.payload.image,
      singleUserPinsName:action.payload.name,
    }
  }

  if(action.type===SUBMIT_REVIEW_BEGIN){
    return{
      ...state,
      isLoading:true
    }
  }

  if(action.type===SUBMIT_REVIEW_SUCCESS){
    return{
      ...state,
      isLoading:false,
      showAlert:true,
      alertType:"success",
      alertText:"The Review is subbmited successfully"
    }
  }
  if(action.type===SUBMIT_REVIEW_ERROR){
    return{
      ...state,
      isLoading:false,
      showAlert:true,
      alertType:"danger",
      alertText:action.payload.msg
    }
  }

  if(action.type===SINGLE_PIN_REVIEWS){
    return{
      ...state,
      singlePinReviews:action.payload.data
    }
  }

  if(action.type===SINGLE_PIN_SINGLE_USER_LIKED_STATUS){
    return{
      ...state,
      SINGLE__PIN__SINGLE__USER__LIKED__STATUS:action.payload.data
    }
  }

  if(action.type===SINGLE_PIN_LIKED_NUMBER){
    return{
      ...state,
      singlePinLikedNumber:action.payload.data

    }
  }
  if(action.type===SINGLE_USER_LIKED_PINS){
    return{
      ...state,
      singleUserLikedPins:action.payload.data

    }
  }
  if(action.type===CURRENT_USER_LIKED_PINS){
    return{
      ...state,
      currentUserLikedPins:action.payload.data

    }
  }

  throw new Error(`no such action : ${action.type}`)
}

export default reducer
