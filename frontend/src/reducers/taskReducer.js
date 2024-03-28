import {
  CLEAR_ERROR,
  ALL_TASK_REQUEST,
  ALL_TASK_SUCCESS,
  ALL_TASK_FAIL,
} from "../constants/taskConstants";

export const tasksReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case ALL_TASK_REQUEST:
      return {
        loading: true,
        tasks: [],
      };

    case ALL_TASK_SUCCESS:
      return {
        loading: false,
        tasks: action.payload.tasks,
      };
    case ALL_TASK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
