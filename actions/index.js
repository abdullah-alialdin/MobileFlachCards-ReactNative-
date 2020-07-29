export const GET_INITIAL_DECKS = "GET_INITIAL_DECKS";
export const ADD_NEW_DECK = "ADD_NEW_DECK";
export const ADD_NEW_CARD = "ADD_NEW_CARD";
export const REMOVE_DECK = "REMOVE_DECK";

export function getInitialData(decks) {
    return {
        type: GET_INITIAL_DECKS,
        decks,
    };
}

export function addNewDeck(deck) {
    return {
        type: ADD_NEW_DECK,
        deck,
    };
}

export function addNewCard(deckId, card) {
    return {
        type: ADD_NEW_CARD,
        deckId,
        card,
    };
}

export function deleteDeck(deckId) {
    return {
        type: REMOVE_DECK,
        deckId,
    };
}
