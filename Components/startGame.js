import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Nav = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.center}>
            <TouchableOpacity
            style={styles.btn}
            onPress={() => {
                navigation.navigate('Single_Deck')
            }}>
                <Text>Go back to deck</Text>
            </TouchableOpacity>
        </View>
    )
}

class StartGame extends React.Component {
    state = {
        answer: false,
        number: 0,
        total: this.props.decks[0][this.props.selected].questions.length,
        end: false,
        correct: 0,
        incorrect: 0
    }
    correct = () => {
        if(this.state.number < this.state.total - 1) {
            this.setState((prev) => ({
                number: prev.number + 1,
                correct: prev.correct + 1
            }))
        } else {
            this.setState((prev) => ({
                end: !prev.end,
                correct: prev.correct + 1
            }))
        }
    }
    incorrect = () => {
        if(this.state.number < this.state.total - 1) {
            this.setState((prev) => ({
                number: prev.number + 1,
                incorrect: prev.incorrect + 1
            }))
        } else {
            this.setState((prev) => ({
                end: !prev.end,
                incorrect: prev.incorrect + 1
            }))
        }
    }
    changeState = () => {
        this.setState((prev) => ({
            answer: !prev.answer
        }))
    }
    restart = () => {
        this.setState((prev) => ({
            number: 0,
            end: !prev.end
        }))
    }
    render() {
        const {decks, selected} = this.props

        if (this.state.end === false) {
        if (decks[0][selected].questions.length !== 0) {
            const cards = decks[0][selected].questions
 
        return (
            <View style={styles.center}>
                <Text>{this.state.number + 1} / {this.state.total}</Text>
                <View style={styles.center}>

                    {this.state.answer === false &&
                    <View>
                        <Text>{cards[this.state.number].question}</Text>
                        <Button onPress={this.changeState} title="Answer"></Button>
                    </View>
                    }

                    {this.state.answer === true &&
                    <View>
                        <Text>{cards[this.state.number].answer}</Text>
                        <Button onPress={this.changeState} title="Question"></Button>
                    </View>
                    }                    

                    <TouchableOpacity 
                    style={styles.btn}
                    onPress={this.correct}>
                        <Text style={styles.white}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.btn}
                    onPress={this.incorrect}>
                        <Text style={styles.white}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
        } else {
            return <View><Text>No cards have been added :(</Text></View>
        }
    } else {
        return (
            <View style={styles.fullView}>
                <Text style={styles.header}>
                End of game!
                You scored {this.state.correct} out of {this.state.total}.
               <Nav />
               <TouchableOpacity 
               style={styles.btn}
               onPress={this.restart}>
                   <Text>
                       Restart Game
                   </Text>
               </TouchableOpacity>
               </Text>
            </View>
        )
    }
    }
}

const styles = StyleSheet.create({
    center: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 40
    },
    btn: {
        fontSize: 14,
        padding: 10,
        marginTop: 20, 
        borderRadius: 10, 
        color: "white", 
        width: 200,
        backgroundColor: "#4252ff",
        textAlign: "center",
    }, 
    white: {
        color: "white",
        textAlign: "center",
    },
    fullView: {
        width: "100%",
        textAlign: "center",
        marginTop: 150,
        fontSize: 16,
    },
    header: {
        fontSize: 18,
    }   
})

export default connect((state) => ({
    decks: state.standard,
    selected: state.selected
}))(StartGame)