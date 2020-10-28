import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {clearLocalNotification, setLocalNotification} from '../utils/notifs'

const Nav = (props) => {
    const navigation = useNavigation();
    return (
        <View>
            <TouchableOpacity 
            style={styles.btn}
            onPress={() => navigation.navigate('Add_Card')}
            >
                <Text style={styles.white}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => { 
                clearLocalNotification()
                .then(setLocalNotification())
                .then(navigation.navigate('Start_Game'))             
            }}
            style={styles.btn}>
                <Text style={styles.white}>Start Game</Text>
            </TouchableOpacity>
        </View>
    )
}

class SingleDeck extends React.Component {
    render() {
        const {selected, decks} = this.props
        const object = (selected !== null) ? decks[0][selected] : null

        return (
            <SafeAreaView>

                    {object !== null && (
                        <View style={styles.view}>
                            <Text style={styles.title}> {object.title} </Text>
                            <Text style={styles.question}> {object.questions.length} cards </Text>
                            <Nav />
                        </View>
                        )                        
                    }
              
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        display: "flex",
        textAlign: "center",
        marginTop: 125,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 30
    },
    question: {
        fontSize: 23
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
    }
})

export default connect((state) => ({
    decks: state.standard,
    selected: state.selected
}))(SingleDeck)

