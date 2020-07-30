import { AsyncStorage } from "react-native";

const APP_KEY = "FlashCards:Decks";

const initialDecks = {
    React: {
        title: "React",
        cards: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ],
    },
    JavaScript: {
        title: "JavaScript",
        cards: [
            {
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ],
    },
};

export async function getAllDecks() {
    let data = await AsyncStorage.getItem(APP_KEY);
    return !data ? { ...initialDecks } : JSON.parse(data);
}

export async function createDeck(newDeckEntry) {
    await AsyncStorage.mergeItem(
        APP_KEY,
        JSON.stringify({
            [newDeckEntry.id]: newDeckEntry,
        })
    );
    return;
}

export async function createNewCard(deckId, card) {
    await AsyncStorage.getItem(APP_KEY).then((results) => {
        const data = JSON.parse(results);
        data[deckId] = {
            ...data[deckId],
            cards: [...data[deckId].cards, card],
        };
        AsyncStorage.setItem(APP_KEY, JSON.stringify(data));
    });
    return;
}

export async function removeDeck(deckId) {
    await AsyncStorage.getItem(APP_KEY).then((results) => {
        const data = JSON.parse(results);
        data[deckId] = undefined;
        delete data[deckId];
        AsyncStorage.setItem(APP_KEY, JSON.stringify(data));
    });
    return;
}
