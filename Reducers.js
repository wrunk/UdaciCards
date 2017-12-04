import { LOAD_DECKS, ADD_DECK, ADD_CARD, DEL_DECK } from './Actions'
import * as utils from "./utils"

function decks (state = {decks:[]}, action) {
  let s = {}
  switch (action.type) {
    case LOAD_DECKS:
      return {
        ...state,
        decks: action.decks,
      }
    case ADD_DECK :
      // TODO Save async
      s = {
        ...state,
        decks: [...state.decks, {key: action.deck.title, questions: []}]
      }
      utils.saveDecksToAStore(s.decks)
      return s
    case ADD_CARD :
      const {key, question, answer} = action.card
      s = {
        ...state,
        decks: state.decks.map((d) => {
          if(d.key === key){
            return {key, questions: [...d.questions, {question, answer}]}
          }
          return d
        })
      }
      utils.saveDecksToAStore(s.decks)
      return s
    case DEL_DECK:
      s = {
        ...state,
        decks: state.decks.filter((d) => (d.key !== action.key))
      }
      utils.saveDecksToAStore(s.decks)
      return s
    default :
      return state
  }
}

export default decks
