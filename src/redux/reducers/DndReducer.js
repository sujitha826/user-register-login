let storedCardsList = JSON.parse(localStorage.getItem("dndCards"));

if (!storedCardsList)
    storedCardsList = [];

const initialState = {
    dndCardsList: storedCardsList
};
console.log(initialState);

const dndCards = (state = initialState, action) => {
    console.log("action called cards", action);
    switch (action.type) {
        case "STORE_DND_CARD":
            return Object.assign({}, state, { dndCardsList: action.payload });

        default:
            return state;
    }
}

export default dndCards;