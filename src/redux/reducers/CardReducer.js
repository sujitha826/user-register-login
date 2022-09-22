let storedCardsList = JSON.parse(localStorage.getItem("allCards"));

if (!storedCardsList)
    storedCardsList = [];

const initialState = {
    cardsList: storedCardsList
};

const cards = (state = initialState, action) => {
    console.log("action called cards", action);
    switch (action.type) {
        case "STORE_CARD":
            return Object.assign({}, state, { cardsList: action.payload });

        default:
            return state;
    }
}

export default cards;