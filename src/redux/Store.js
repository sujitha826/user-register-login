import { combineReducers } from "redux";
import { legacy_createStore as createStore } from 'redux';

import users from './reducers/UserReducer';
import loginNow from "./reducers/loginReducer";

const allReducers = combineReducers(
    {
        users,
        loginNow
    }
);
const store = createStore(allReducers);

export default store;