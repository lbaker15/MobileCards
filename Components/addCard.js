import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native';
import * as API from '../utils/api'
import { addCardPre } from '../actions/addCard';

class AddCard extends React.Component {
    state = {
        question: '',
        answer: ''
    }
    handleChange = (text) => {
        this.setState({
            question: text
        })
    }
    handleChangeTwo = (text) => {
        this.setState({
            answer: text
        })
    }
    submitCard = () => {
        const title = this.props.selected
        const question = { "question": this.state.question, "answer": this.state.answer }
        this.props.dispatch(addCardPre(question,title))
    }
    startGame = () => {

    }
    render() {
        console.log(this.props.decks)
        return (
            <View style={{marginTop: 50, display: "flex", gap: 40, alignItems: "center", justifyContent: "center",}}>
                <label style={{fontFamily: 'sans-serif', fontSize: 18}}>Question:</label>
                <TextInput
                style={{border: "none", backgroundColor: "white", width: 400, padding: 7.5, borderRadius: 15, boxShadow: "2px 2px 10px #c3c3c3"}}
                onChangeText={this.handleChange}
                ></TextInput>
                <label style={{fontFamily: 'sans-serif', fontSize: 18}}>Answer:</label>
                <TextInput
                style={{border: "none", backgroundColor: "white", width: 400, padding: 7.5, borderRadius: 15, boxShadow: "2px 2px 10px #c3c3c3"}}
                onChangeText={this.handleChangeTwo}
                ></TextInput>
                <TouchableOpacity 
                onPress={this.submitCard}
                style={styles.btn}>
                    <Text style={styles.white}>Add Card</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
}))(AddCard)