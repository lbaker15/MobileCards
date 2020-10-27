//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import Ionicons from 'react-native-vector-icons/Ionicons';
import DeckList from './Components/deckList'
import SingleDeck from './Components/singleDeck'
import AddDeck from './Components/addDeck'
import AddCard from './Components/addCard'
import StartGame from './Components/startGame'
import { createStore } from 'redux';
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import {setLocalNotification, timeToString} from './utils/notifs'


const Tab = createBottomTabNavigator();
const DeckStack = createStackNavigator();
const AddDeckStack = createStackNavigator();



const Decks = () => (
  <DeckStack.Navigator>
    <DeckStack.Screen name="Deck_List" component={DeckList} />
    <DeckStack.Screen name="Single_Deck" component={SingleDeck} />
    <DeckStack.Screen name="Add_Card" component={AddCard} />
    <DeckStack.Screen name="Start_Game" component={StartGame} />
  </DeckStack.Navigator>
)

const AddNewDeck = () => (
  <AddDeckStack.Navigator>
    <AddDeckStack.Screen name="Add Deck" component={AddDeck} />
  </AddDeckStack.Navigator>
)


class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
    timeToString()
  }
  render() {
  return (
    <Provider store={createStore(reducer, middleware) }>
    <View style={styles.container}>
      <NavigationContainer>
        <StatusBar backgroundColor='#ecf0f1' barStyle="light-content"  />
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >

          <Tab.Screen name="Deck List" component={Decks} />
          <Tab.Screen name="Add Deck" component={AddNewDeck} />

        </Tab.Navigator>
      </NavigationContainer>
    </View>
    </Provider>
  )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
