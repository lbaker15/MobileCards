import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { addCardPre } from '../actions/addCard';

class AddCard extends React.Component {
    state = {
        question: '',
        answer: '',
        alert: '',
        isFocused: true,
        isFocusedTwo: true,
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
    handleBlur = () => {
        this.setState((prev) => ({
            isFocused: !prev.isFocused
        }))
    }
    handleBlurTwo = () => {
        this.setState((prev) => ({
            isFocusedTwo: !prev.isFocusedTwo
        }))
    }
    render() {
        if (this.props.route.params.darkMode === true) {
        return (
            <View style={styles.contain}>
                <Text style={styles.alert}>{this.state.alert}</Text>
                <Text style={styles.ques}>Question:</Text>
                <TextInput
                placeholder="Is React a functional programming langauge?"
                placeholderTextColor={'white'}
                onBlur={this.handleBlur}
                style={(this.state.isFocused === false && this.state.question.length < 1) ? [styles.input, {borderBottomColor: "red", borderBottomWidth: 0.75}] : [styles.input, {borderBottomColor: "white", borderBottomWidth: 0.75}] }
                onChangeText={this.handleChange}
                ></TextInput>
                <Text style={styles.ans}>Answer:</Text>
                <TextInput
                placeholder="yes"
                placeholderTextColor={'white'}
                onBlur={this.handleBlurTwo}
                style={(this.state.isFocusedTwo === false && this.state.answer.length < 1) ? [styles.input, {borderBottomColor: "red", borderBottomWidth: 0.75}] : [styles.input, {borderBottomColor: "white", borderBottomWidth: 0.75}] }
                onChangeText={this.handleChangeTwo}
                ></TextInput>
                <TouchableOpacity 
                onPress={this.submitCard}
                style={styles.btn}>
                    <Text style={styles.white}>Add Card</Text>
                </TouchableOpacity>
            </View>
        )
        } else {
            return (
            <View style={styles.containWhite}>
                <Text style={styles.alertWhite}>{this.state.alert}</Text>
                <Text style={styles.quesWhite}>Question:</Text>
                <TextInput
                placeholder="Is React a functional programming langauge?"
                placeholderTextColor={'black'}
                onBlur={this.handleBlur}
                style={(this.state.isFocused === false && this.state.question.length < 1) ? [styles.inputWhite, {borderBottomColor: "red", borderBottomWidth: 0.75}] : [styles.inputWhite, {borderBottomColor: "black", borderBottomWidth: 0.75}] }
                onChangeText={this.handleChange}
                ></TextInput>
                <Text style={styles.ansWhite}>Answer:</Text>
                <TextInput
                placeholder="yes"
                placeholderTextColor={'black'}
                onBlur={this.handleBlurTwo}
                style={(this.state.isFocusedTwo === false && this.state.answer.length < 1) ? [styles.inputWhite, {borderBottomColor: "red", borderBottomWidth: 0.75}] : [styles.inputWhite, {borderBottomColor: "black", borderBottomWidth: 0.75}] }
                onChangeText={this.handleChangeTwo}
                ></TextInput>
                <TouchableOpacity 
                onPress={this.submitCard}
                style={styles.btn}>
                    <Text style={styles.whiteWhite}>Add Card</Text>
                </TouchableOpacity>
            </View>  
            )
        }
    }
}

const styles = StyleSheet.create({
    contain: {
        height: 500,
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: "black",
    },
    alert: {
        marginTop: -110,
        marginBottom: 20,
        fontSize: 16,
        color: "red"
    },
    ques: {
        fontFamily: 'sans-serif', 
        fontSize: 18,
        color: "white",
        marginBottom: 5,
        marginTop: 0,
    },
    input: {
        width: 250, 
        padding: 7.5, 
        color: "white",
    },
    ans: {
        fontFamily: 'sans-serif', 
        fontSize: 18,
        color: "white",
        marginBottom: 5,
        marginTop: 20,
    },
    btn: {
        fontSize: 14,
        padding: 10,
        marginTop: 40, 
        borderRadius: 10, 
        color: "white", 
        width: 130,
        backgroundColor: "#4252ff",
    }, 
    white: {
        color: "white",
        textAlign: "center",
    },



    containWhite: {
        height: 500,
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: "white",
    },
    alertWhite: {
        marginTop: -110,
        marginBottom: 20,
        fontSize: 16,
        color: "red"
    },
    quesWhite: {
        fontFamily: 'sans-serif', 
        fontSize: 18,
        color: "black",
        marginBottom: 5,
        marginTop: 0,
    },
    inputWhite: {
        width: 250, 
        padding: 7.5, 
        color: "black",
    },
    ansWhite: {
        fontFamily: 'sans-serif', 
        fontSize: 18,
        color: "black",
        marginBottom: 5,
        marginTop: 20,
    },
    btn: {
        fontSize: 14,
        padding: 10,
        marginTop: 40, 
        borderRadius: 10, 
        color: "white", 
        width: 130,
        backgroundColor: "#4252ff",
    }, 
    whiteWhite: {
        color: "black",
        textAlign: "center",
    }
})

export default connect((state) => ({
    decks: state.standard,
    selected: state.selected
}))(AddCard)