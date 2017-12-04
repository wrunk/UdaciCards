import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import * as utils from "../utils"
import {delDeck} from "../Actions"
import {connect} from "react-redux"


class Deck extends React.Component {

  startAddCard(){
    const { deck } = this.props.navigation.state.params
    return this.props.navigation.navigate('AddCard', {deck})
  }

  startQuiz(){
    return this.props.navigation.navigate('Quiz', {deck:this.deck()})
  }

  deleteDeck(){
    const { deck } = this.props.navigation.state.params
    this.props.delDeck(deck.key)
    return this.props.navigation.goBack()
  }

  deck = () => {
    const {deck} = this.props.navigation.state.params
    return this.props.decks.find((d) => d.key === deck.key)
  }

  render() {

    if(!this.deck()){ // Stupid bug when deleting a deck
      return (
        <View>
          <Text> - deleted -</Text>
        </View>
      )
    }

    return (

      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{this.deck().key}</Text>
          <Text style={styles.num}>{this.deck().questions.length} Card(s) In Deck</Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => this.startQuiz()} style={styles.startTouch}>
            <Text style={styles.start}>Start Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.startAddCard()} style={styles.addTouch}>
            <Text style={styles.add}>Add Card</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => this.deleteDeck()} style={styles.delTouch}>
            <Text style={styles.del}>Delete Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title:{
    fontSize:42,
    color: utils.black,

  },
  num: {
    fontSize:28,
    color: utils.gray,
  },

  startTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#1E59F7',
    backgroundColor: '#1E59F7',
    width: 200,
    height: 80,
    marginBottom:10,
  },

  addTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    borderWidth: 2,
    borderColor: '#D8ECEC',
    borderRadius: 8,
    backgroundColor: '#D8ECEC',
    width: 200,
    height: 80,

  },

  delTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: utils.red,
    backgroundColor: utils.red,
    width: 150,
    height: 48,

  },

  //
  // ** Button Textes
  start: {
    color: '#FFFFFF',
    fontSize:24,
  },
  add: {
    color: '#1E59F7',
    fontSize:24,
  },
  del: {
    color: '#FFFFFF',
    fontSize:16,
  },

});

function mapStateToProps(state){
  return {
    decks: state.decks,
  }
}

function mapDispatchToProps(dispatch){

  return {
    delDeck: (key) => dispatch(delDeck(key))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck)
