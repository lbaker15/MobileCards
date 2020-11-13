import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DeckList from './Components/deckList'
import SingleDeck from './Components/singleDeck'
import AddDeck from './Components/addDeck'
import AddCard from './Components/addCard'
import EndGame from './Components/endGame'
import StartGame from './Components/startGame'
import { createStore } from 'redux';
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import {setLocalNotification, timeToString} from './utils/notifs'
import * as Notifications from 'expo-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();
const DeckStack = createStackNavigator();
const AddDeckStack = createStackNavigator();

const Decks = () => (
  <DeckStack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: 'white'
  }}
  >
      <DeckStack.Screen 
        name="Deck_List" 
        component={DeckList} 
        options={{
          title: 'Deck List',
        }} />
        <DeckStack.Screen 
        name="Single_Deck" 
        component={SingleDeck} 
        options={{
          title: 'Single Deck',
        }} />
        <DeckStack.Screen 
        name="Add_Card" 
        component={AddCard} 
        options={{
          title: 'Add Card',
        }} />
        <DeckStack.Screen 
        name="Start_Game" 
        component={StartGame} 
        options={{
          title: 'Start Game',
        }} />
        <DeckStack.Screen 
        name="End_Game" 
        component={EndGame} 
        options={{
          title: 'End Game',
        }} />
  </DeckStack.Navigator>
)

const AddNewDeck = () => (
  <AddDeckStack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: 'white'
  }}>
    <AddDeckStack.Screen name="Add Deck" component={AddDeck} />
  </AddDeckStack.Navigator>
)


class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
  return (
    <Provider store={createStore(reducer, middleware) }>
    <View style={styles.container}>
      <NavigationContainer> 
        <StatusBar backgroundColor='black' barStyle="dark-content"  />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Deck List') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              } else if (route.name === 'Add Deck') {
                iconName = focused ? 'md-add-circle' : 'md-add-circle-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />
            }
          })}
          tabBarOptions={{
            style: {
              backgroundColor: "#5947ff"
            },
            activeTintColor: '#2c144f',
            inactiveTintColor: 'white',
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
    backgroundColor: 'black',
  },
});
