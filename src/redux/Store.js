import { combineReducers } from "redux";
import { legacy_createStore as createStore } from 'redux';

import users from './reducers/UserReducer';
import loginNow from "./reducers/LoginReducer";
import cards from "./reducers/CardReducer";
import dndCards from "./reducers/DndReducer";

const allReducers = combineReducers(
    {
        users,
        loginNow,
        cards,
        dndCards
    }
);

const store = createStore(allReducers);
export default store;