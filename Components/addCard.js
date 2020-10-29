import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import * as API from '../utils/api'
import { addCardPre } from '../actions/addCard';

class AddCard extends React.Component {
    state = {
        question: '',
        answer: '',
        alert: '',
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
        if (this.state.question.length !== 0 && this.state.answer.length !== 0) {
            const question = { "question": this.state.question, "answer": this.state.answer }
            new Promise((res, rej) => {
                res(this.props.dispatch(addCardPre(question,title)))
            })
            .then(() => {
                this.setState({
                    alert: 'Card added'
                })
            })
            .then(() => {
                setTimeout(() => {this.setState({alert: ''})}, 2000)
            }) 
        } else {
            this.setState({
                alert: 'Please enter both fields'
            })
        }
    }
    startGame = () => {

    }
    render() {
        console.log(this.props.decks)
        return (
            <View style={{marginTop: 50, display: "flex", gap: 40, alignItems: "center", justifyContent: "center",}}>
                <Text>{this.state.alert}</Text>
                <Text style={{fontFamily: 'sans-serif', fontSize: 18}}>Question:</Text>
                <TextInput
                style={{backgroundColor: "white", width: 250, padding: 7.5, borderRadius: 15}}
                onChangeText={this.handleChange}
                ></TextInput>
                <Text style={{fontFamily: 'sans-serif', fontSize: 18}}>Answer:</Text>
                <TextInput
                style={{backgroundColor: "white", width: 250, padding: 7.5, borderRadius: 15}}
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
        width: 80,
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