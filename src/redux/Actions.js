// action-creators => dispatch actions
export const storeUsersList = (payload) => {
    return {
        type: "STORE_USERS",
        payload: payload
    }
}

export const storeLoginUser = (payload) => {
    return {
        type: "STORE_LOGIN_USER",
        payload: payload
    }
}