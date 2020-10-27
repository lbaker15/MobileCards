import AsyncStorage from "@react-native-community/async-storage";
//import dummyData from './dummyData'

const DECKS_KEY = "MobileCards:decks"

const dummyData = {
   React: {
     title: 'React',
     questions: [
       {
         question: 'What is React?',
         answer: 'A library for managing user interfaces'
       },
       {
         question: 'Where do you make Ajax requests in React?',
         answer: 'The componentDidMount lifecycle event'
       }
     ]
   },
   JavaScript: {
     title: 'JavaScript',
     questions: [
       {
         question: 'What is a closure?',
         answer: 'The combination of a function and the lexical environment within which that function was declared.'
       }
     ]
   }
 }


 export const getDecks = async () => {
   
        const data = await AsyncStorage.getItem(DECKS_KEY);
        return data !== null && data !== "undefined"
        ? JSON.parse(data)
        : AsyncStorage.setItem(DECKS_KEY, JSON.stringify(dummyData))

 }

 export const addDeck = async (value) => {
    AsyncStorage.mergeItem( 
      DECKS_KEY, 
      JSON.stringify({
        [value]: {
          title: value,
          questions: []
        }
      }))
 }

 export const getSingleDeck = async (title) => {
   AsyncStorage.getItem(DECKS_KEY, (err, result) => {
      return JSON.parse(result)[title]
   })
 }

export const submitCard = async (question, title) => {
  const data = await AsyncStorage.getItem(DECKS_KEY)
  const deck = JSON.parse(data)
  const newDeck = deck[title].questions.concat(question)
  AsyncStorage.mergeItem(DECKS_KEY, 
  JSON.stringify({
    [title]: {
      questions: newDeck
    }
  })  
  )
}

export const deleteDeck = async (title) => {
  const data = await AsyncStorage.getItem(DECKS_KEY, (err, res) => {
    return JSON.parse(res)
  })
  const deck = JSON.parse(data)
  delete deck[title]
  AsyncStorage.setItem(DECKS_KEY, JSON.stringify(deck))
}