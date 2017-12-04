import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar,
  TextInput } from 'react-native';
import * as utils from "../utils"
import { connect } from 'react-redux'

import {addDeck} from '../Actions'


class AddDeck extends React.Component {

  state = {
    title:'',
  }

  add = () => {
    this.props.addDeck({title: this.state.title})
    this.setState({title:''})
    this.props.navigation.navigate('Decks')
  }

  render() {

    return (
      <View style={styles.container}>

        <View style={styles.formTitle}>
          <Text style={styles.title}>Add a New Deck</Text>
        </View>


        <View style={styles.form}>
          <Text style={styles.inputTitle}>Title:</Text>

            <TextInput
              style={styles.text}
              onChangeText={(title) => this.setState({title})}
              value={this.state.title}
            />
        </View>

        <View style={styles.butt}>
        <TouchableOpacity onPress={this.add}
                          style={styles.submitTouch}>
          <Text style={styles.add}>Submit New Deck</Text>
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text:{
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    width: 300,
  },
  title:{
    fontSize:42,
    color: utils.black,
  },
  inputTitle:{
    fontSize: 16,
  },
  formTitle:{
    paddingBottom: 50,
  },
  submitTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    borderWidth: 2,
    borderColor: '#1E59F7',
    borderRadius: 8,
    width: 200,
    backgroundColor:'#1E59F7',
    height: 70,
  },
  butt:{

  },
  add: {
    fontSize:24,
    color: '#FFFFFF',
  },
});

function mapStateToProps(state){
  return {}
}

function mapDispatchToProps(dispatch){
  /*
  return {
    remove: () => dispatch(addEntry({
      [entryId]: timeToString() === entryId
        ? getDailyReminderValue()
        : null
    })),
    goBack: () => navigation.goBack(),
  }
   */
  return {
    addDeck: (deck) => dispatch(addDeck(deck))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)
