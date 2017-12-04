import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar, AsyncStorage } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Constants } from 'expo'
import Decks from "./components/Decks"
import Deck from "./components/Deck"
import AddCard from "./components/AddCard"
import AddDeck from "./components/AddDeck"
import {Quiz} from "./components/Quiz"
import * as utils from './utils'
import reducer from "./Reducers"
import {createStore} from 'redux'
import { Provider } from 'react-redux'

export default class App extends React.Component {

  componentDidMount(){
    // Enable this to clear
    // AsyncStorage.clear()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>

        <View style={{flex:1}}>
          <View style={{ backgroundColor: utils.gray, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={utils.gray} />
          </View>
          <SNav/>

        </View>
      </Provider>
    );
  }
}

const TNav = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
    }
  },
},{
  tabBarOptions: {
    activeTintColor: '#2D888A',
    activeBackgroundColor: '#65FBD2',
    inactiveTintColor: '#2D888A',
    inactiveBackgroundColor: '#D8ECEC',
    labelStyle: {
      fontSize: 18,
    },
    style: {
    },
  }})

const SNav = StackNavigator({
  Home: {
    screen: TNav,
    navigationOptions: {
      header: null,
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.deck.key}`,
      headerTintColor: utils.white,
      headerStyle: {
        backgroundColor: utils.gray,
      }
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: ({navigation}) => ({
      title: 'Add Card to Deck',
      headerTintColor: utils.white,
      headerStyle: {
        backgroundColor: utils.gray,
      }
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({navigation}) => ({
      title: 'Quiz Time!',
      headerTintColor: utils.white,
      headerStyle: {
        backgroundColor: utils.gray,
      }
    })
  },
})

