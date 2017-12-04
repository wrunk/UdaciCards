export const LOAD_DECKS = 'LOAD_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const DEL_DECK = 'DEL_DECK'

export function loadDecks(decks){
  return {
    type: LOAD_DECKS,
    decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function addCard (card) {
  return {
    type: ADD_CARD,
    card,
  }
}

export function delDeck (key) {
  return {
    type: DEL_DECK,
    key,
  }
}
