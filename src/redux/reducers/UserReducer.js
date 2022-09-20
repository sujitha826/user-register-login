let storedUsersList = JSON.parse(localStorage.getItem("users"));
if (!storedUsersList)
    storedUsersList = [];

const initialState = {
    list: storedUsersList
};

const users = (state = initialState, action) => {
    console.log("action called users", action);
    switch (action.type) {
        case "STORE_USERS":
            return Object.assign({}, state, { list: action.payload });

        default:
            return state;
    }
}

export default users;