import axios from 'axios';
import {
    CLEAR_ERROR,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
} from "../constants/userConstants";


export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `https://taskmanager-4ytt.onrender.com/api/v1/login`,
      userData,
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
      // Remove or adjust the Content-Type header
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(`https://taskmanager-4ytt.onrender.com/api/v1/register`, userData, config); // Use relative URL
     
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    } catch (error) {
     // Log the full error object for debugging purposes
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  


export const loadUser = () => async (dispatch) => {
    try {
      dispatch({type:LOAD_USER_REQUEST});
  
      const {data}=await axios.get(`/api/v1/me`);
      dispatch({type:LOAD_USER_SUCCESS,payload:data.user});
  
    } catch (error) {
      dispatch({type:LOAD_USER_FAIL,payload:error.response.data.message});
    }
  };
  
  export const logout = () => async (dispatch) => {
    try {
      await axios.get(`https://taskmanager-4ytt.onrender.com/api/v1/logout`);
      dispatch({type:LOGOUT_SUCCESS});
  
    } catch (error) {
      dispatch({type:LOGOUT_FAIL,payload:error.response.data.message});
    }
  };
  
  
  export const clearError=()=>async (dispatch)=>{
      dispatch({type:CLEAR_ERROR});
  
  }