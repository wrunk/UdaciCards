import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { Constants } from 'expo'
import * as utils from "../utils"
import { connect } from 'react-redux'
import {loadDecks} from "../Actions"

class Decks extends React.Component {

  componentDidMount(){ // Load the decks from asyncstore
    const {dispatch} = this.props

    utils.getDecksFromAStore()
      .then((decks) => {
        return decks
      })
      .then((decks) => dispatch(loadDecks(decks)))
  }

  loadDeck(deck){
    return this.props.navigation.navigate('Deck', {deck})
  }

  render() {
    if(this.props.decks.length === 0){
      return (
        <View style={[styles.container, {alignItems: 'center'}]}>
          <Text style={styles.deckNumCards}>
            No decks yet, click below to add
          </Text>
        </View>
      )
    }
    return (

      <View style={styles.container}>
        <FlatList
          data={this.props.decks}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => this.loadDeck(item)}
            >
              <View style={styles.deck}>
                <Text style={styles.deckTitle}>{item.key}</Text>
                <Text style={styles.deckNumCards}>{item.questions.length} cards</Text>
              </View>
            </TouchableOpacity>
          )}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  box: {
    borderWidth:2,
    borderColor: '#ff0000',
    backgroundColor:'#0000ff',
  },
  deck: {
    flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderRadius: 8,
  },
  deckTitle: {
    fontSize: 24,
    color: utils.black,

  },
  deckNumCards: {
    fontSize: 18,
    color: utils.gray,
  },
});

function mapStateToProps(state){
  return{decks: state.decks}
}

export default connect(mapStateToProps)(Decks)
