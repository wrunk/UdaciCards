import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar,
  TextInput } from 'react-native';
import * as utils from "../utils"


export class Quiz extends React.Component {

  state = {
    showAnswer: false,
    done: false,
    q: 0,
    score: 0,
    error: '',
    started: false,
  }

  componentDidMount(){
    this.start()
  }

  start(){
    const { deck } = this.props.navigation.state.params
    if(deck.questions.length === 0){
      this.setState({error:'Oops, this deck is empty, cant quaz'})
    } else {
      this.setState({q:1, started: true, score: 0, done: false, showAnswer: false})
    }
  }

  advance(wasCorrect){
    const { deck } = this.props.navigation.state.params

    let score = this.state.score
    let done = false
    if(wasCorrect){
      score++
    }
    if(this.state.q === deck.questions.length){ // Done
      done = true
      // See readme for details on notifications
      // They've finished a quiz, so they don't need a notification today.
      utils.setLocalNotification()
    }
    this.setState({
      done,
      score,
      q: this.state.q + 1,
      showAnswer: false,
    })
  }

  showAnswer(){
    this.setState({showAnswer:true})
  }

  getQuestion(){
    const { deck } = this.props.navigation.state.params
    return deck.questions[this.state.q - 1]
  }

  showQuiz(){

    const { deck } = this.props.navigation.state.params
    return (
      <View style={styles.container}>

        <View>
          <Text style={styles.title}>Question: {this.state.q}/ {deck.questions.length}</Text>
          <Text style={styles.titleKey}>{this.getQuestion().question}</Text>

          {this.state.showAnswer?
            <Text style={styles.titleKey}>Answer: {this.getQuestion().answer}</Text>
            :
            <Text style={styles.titleKey}>Answer: (hidden)</Text>
          }
        </View>

        <View>

          <TouchableOpacity onPress={() => this.showAnswer()} style={styles.showTouch}>
            <Text style={styles.show}>Show Answer</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.advance(true)} style={styles.rightTouch}>
            <Text style={styles.right}>Got Right?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.advance(false)} style={styles.wrongTouch}>
            <Text style={styles.wrong}>Got Wrong?</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }

  showDone(){
    return (
      <View style={styles.container}>
        <View>
        <Text style={styles.title}>Quiz complete!</Text>

        </View>
        <View>
        <Text style={styles.titleKey}>You got score: {this.state.score}</Text>

        </View>
        <View>
          <TouchableOpacity onPress={() => this.start()} style={styles.rightTouch}>
            <Text style={styles.right}>Take Quiz Again</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.showTouch}>
            <Text style={styles.show}>Go Back To Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const { deck } = this.props.navigation.state.params

    if(this.state.error !== ''){
      return (
        <View style={styles.container}>
          <Text style={styles.error}>{this.state.error}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.showTouch}>
            <Text style={styles.show}>Go Back To Deck</Text>
          </TouchableOpacity>
        </View>
      )
    }

    if(!this.state.started){
      return (
        <View style={styles.container}>
          <Text>...</Text>
        </View>
      )
    }

    if(this.state.done){
      return this.showDone()
    }
    return this.showQuiz()
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

  start: {
    fontSize:24,
    color: '#FFFFFF',
  },

  error: {
    fontSize:24,
    color: '#FF0000',
  },

  showTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    borderWidth: 2,
    borderColor: '#D8ECEC',
    borderRadius: 8,
    backgroundColor: '#D8ECEC',
    width: 200,
    height: 80,
    marginBottom:10,
  },
  rightTouch: {
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
  wrongTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: utils.red,
    backgroundColor: utils.red,
    width: 200,
    height: 80,
  },
  show: {
    color: '#1E59F7',
    fontSize:24,
  },
  right: {
    color: '#FFFFFF',
    fontSize:24,
  },
  wrong: {
    color: '#FFFFFF',
    fontSize:24,
  },

});
