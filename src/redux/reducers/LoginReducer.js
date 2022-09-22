let storedLogin = JSON.parse(localStorage.getItem("login_user"));

if (!storedLogin)
    storedLogin = [];

const initialState = {
    loginUser: storedLogin
}

const loginNow = (state = initialState, action) => {
    console.log("action called loginNow", action);

    switch (action.type) {
        case "STORE_LOGIN_USER":
            return Object.assign({}, state, { loginUser: action.payload });

        default:
            return state;
    }
};

export default loginNow;