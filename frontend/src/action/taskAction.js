import axios from "axios";
import {
  ALL_TASK_FAIL,
  ALL_TASK_REQUEST,
  ALL_TASK_SUCCESS,
  CLEAR_ERROR,
  DELETE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  NEW_TASK_FAIL,
  NEW_TASK_REQUEST,
  NEW_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS
} from "../constants/taskConstants";


  export const getTasks = (token,params ) => async (dispatch) => {
    try {
      dispatch({
        type: ALL_TASK_REQUEST,
      });
      
      const { data } = await axios.get(`https://taskmanager-4ytt.onrender.com/api/v1/tasks`, {
      headers: {
        'authorization': `Bearer ${token}`
      },
      params: params // Include the params object here
    });
      
    
      dispatch({ type: ALL_TASK_SUCCESS, payload: data });
    } catch (err) {
    console.log(err);
      dispatch({
        type: ALL_TASK_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  // Create Task
export const createTask = (taskData,token) => async (dispatch) => {
  try {
    dispatch({ type: NEW_TASK_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json",
      'authorization': `Bearer ${token}` },
    };

    const { data } = await axios.post(
      `https://taskmanager-4ytt.onrender.com/api/v1/tasks/new`,
      taskData,
      config
    );

    dispatch({
      type: NEW_TASK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: NEW_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Delete Product
export const deleteTask = (id,token) => async (dispatch) => {

 
  try {
    dispatch({ type: DELETE_TASK_REQUEST });
    const config = {
      headers: {
      'authorization': `Bearer ${token}`
    },
    };
    const  {data}  = await axios.delete(`https://taskmanager-4ytt.onrender.com/api/v1/task/${id}`,config);
    

    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: data.success,
    });
   
     //dispatch(getTasks());
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Delete Product
export const updateTask = (id,taskData,token) => async (dispatch) => {

 
  try {
    dispatch({ type:UPDATE_TASK_REQUEST });
    const config = {
      headers: {
      'authorization': `Bearer ${token}`
    },
    };
    const  {data}  = await axios.put(`https://taskmanager-4ytt.onrender.com/api/v1/task/${id}`, taskData,config);
    
console.log(data);
    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: data.success,
    });
   
     //dispatch(getTasks());
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
