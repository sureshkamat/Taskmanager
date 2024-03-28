import axios from "axios";
import {
    ALL_TASK_FAIL,
    ALL_TASK_REQUEST,
    ALL_TASK_SUCCESS
} from "../constants/taskConstants";

  export const getTasks = ( ) => async (dispatch) => {
    try {
      dispatch({
        type: ALL_TASK_REQUEST,
      });
      
      const  {data}  = await axios.get(`/api/v1/tasks`);
     console.log(data);
      dispatch({ type: ALL_TASK_SUCCESS, payload: data });
    } catch (err) {
    console.log(err);
      dispatch({
        type: ALL_TASK_FAIL,
        payload: err.response.data.message,
      });
    }
  };