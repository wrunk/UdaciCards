import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar,
  TextInput } from 'react-native';
import * as utils from "../utils"
import {addCard} from "../Actions"
import {connect} from "react-redux"


class AddCard extends React.Component {
  state = {
    question:'',
    answer:'',
  }

  addCard = () => {
    const { deck } = this.props.navigation.state.params
    const {question, answer} = this.state
    this.props.addCard({key: deck.key, question, answer})
    return this.props.navigation.goBack()
  }

  render() {
    const { deck } = this.props.navigation.state.params

    return (

      <View style={styles.container}>

        <View>
          <Text style={styles.title}>Add card for deck</Text>
          <Text style={styles.titleKey}>{deck.key}</Text>
        </View>


        <View>
          <Text style={styles.text}>Question:</Text>
          <TextInput
            style={[styles.input, styles.inputQ]}
            onChangeText={(question) => this.setState({question})}
            value={this.state.question}
          />

          <Text style={styles.text}>Answer:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
          />
        </View>


        <View>
          <TouchableOpacity onPress={this.addCard}
                            style={styles.submitTouch}>
            <Text style={styles.submit}>Submit New Card</Text>
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

  title:{
    fontSize:42,
    color: utils.black,
  },

  titleKey: {
    fontSize:28,
    color: utils.gray,
  },

  text: {
    fontSize: 16,
  },

  inputQ: {
    marginBottom:15

  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    width: 300,
  },

  submitTouch: {
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

  submit: {
    fontSize:24,
    color: '#FFFFFF',
  },
});


// TODO perhaps it would be better to map the store.deck here instead of passing from the nav
// except that we need to know which one anyway from the nav and since its only a couple
// fields just let the damn nav pass it!
function mapStateToProps(state){
  return {}
}

function mapDispatchToProps(dispatch){

  return {
    addCard: (card) => dispatch(addCard(card))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
