import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {clearLocalNotification, setLocalNotification} from '../utils/notifs'
import { LinearGradient } from "expo-linear-gradient";


const Nav = (props) => {
    const navigation = useNavigation();
    return (
        <View>
            <TouchableOpacity 
            onPress={() => navigation.navigate('Add_Card')}
            >
            <LinearGradient
            colors={["rgba(66,105,255,1)", "rgba(91,50,255,1)"]}
            locations={[0, 1.0]} 
            start={{x: 1, y: 0.5}}
            style={styles.btn}
            >
                {props.darkMode === true &&
                <Text style={styles.white}>
                    
                    Add Card</Text>
                }
                 {props.darkMode === false &&
                <Text style={styles.whiteLight}>Add Card</Text>
                }
            </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
            onPress={() => { 
                clearLocalNotification()
                .then(setLocalNotification())
                .then(navigation.navigate('Start_Game'))             
            }}> 
                <LinearGradient
                colors={["rgba(66,105,255,1)", "rgba(91,50,255,1)"]}
                locations={[0, 1.0]} 
                start={{x: 1, y: 0.5}}
                style={styles.btn}
                >
                    {props.darkMode === true &&
                    <Text style={styles.white}>Start Game</Text>
                    } 
                    {props.darkMode === false &&
                    <Text style={styles.whiteLight}>Start Game</Text>
                    }
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

class SingleDeck extends React.Component {
    render() {
        const {selected, decks, dark} = this.props
        const object = (selected !== null) ? decks[0][selected] : null
        if (dark === true) {
        return (
            <SafeAreaView style={styles.black}>

                {object !== null && (
                    <View style={styles.view}>
                        <Text style={styles.title}> {object.title} </Text>
                        <Text style={styles.question}> {object.questions.length} cards </Text>
                        <Nav darkMode={dark} />
                    </View>
                    )                        
                }
              
            </SafeAreaView>
        )
        } else {
            return (
                <SafeAreaView style={styles.blackLight}>
    
                        {object !== null && (
                            <View style={styles.viewLight}>
                                <Text style={styles.titleLight}> {object.title} </Text>
                                <Text style={styles.questionLight}> {object.questions.length} cards </Text>
                                <Nav darkMode={dark} />
                            </View>
                            )                        
                        }
                  
                </SafeAreaView>
            )
        }
    }
}

const styles = StyleSheet.create({
    black: {
        backgroundColor: "black",
        height: 800
    },
    view: {
        display: "flex",
        textAlign: "center",
        marginTop: 125,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        color: "white"
    },
    question: {
        fontSize: 23,
        color: "white"
    },
    btn: {
        fontSize: 14,
        padding: 10,
        marginTop: 20, 
        borderRadius: 10, 
        color: "white", 
        width: 200,
        backgroundColor: "#4252ff",
    },
    white: {
        color: "white",
        textAlign: "center",
    },



    blackLight: {
        backgroundColor: "white",
        height: 800
    },
    viewLight: {
        display: "flex",
        textAlign: "center",
        marginTop: 125,
        alignItems: "center",
        justifyContent: "center",
    },
    titleLight: {
        fontSize: 30,
        color: "black"
    },
    questionLight: {
        fontSize: 23,
        color: "black"
    },
    btn: {
        fontSize: 14,
        padding: 10,
        marginTop: 20, 
        borderRadius: 10, 
        color: "white", 
        width: 200,
        backgroundColor: "#4252ff",
    },
    whiteLight: {
        color: "white",
        textAlign: "center",
    }
})

export default connect((state) => ({
    decks: state.standard,
    selected: state.selected,
    dark: state.darkMode,
}))(SingleDeck)

