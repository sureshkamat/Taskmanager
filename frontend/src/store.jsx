import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { userReducer } from './reducers/userReducer';
import { tasksReducer } from './reducers/taskReducer';


const rootReducer = combineReducers({
user:userReducer,
task:tasksReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;   