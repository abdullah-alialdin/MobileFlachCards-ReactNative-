import {
    GET_INITIAL_DECKS,
    ADD_NEW_DECK,
    ADD_NEW_CARD,
    REMOVE_DECK,
} from "../actions";

export default function getDecks(state = {}, action) {
    switch (action.type) {
        case GET_INITIAL_DECKS:
            return {
                ...state,
                ...action.decks,
            };
        case ADD_NEW_DECK:
            const { deck } = action;
            return {
                ...state,
                [deck.id]: deck,
            };
        case ADD_NEW_CARD:
            const { deckId, card } = action;
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    cards: [...state[deckId].cards, card],
                },
            };
        case REMOVE_DECK:
            const newState = { ...state };
            delete newState[action.deckId];
            return newState;
        default:
            return state;
    }
}
