import { combineReducers } from "redux";
import { legacy_createStore as createStore } from 'redux';

import users from './reducers/UserReducer';
import loginNow from "./reducers/LoginReducer";
import cards from "./reducers/CardReducer";

const allReducers = combineReducers(
    {
        users,
        loginNow,
        cards
    }
);

const store = createStore(allReducers);
export default store;