import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Nav = () => {
    const navigation = useNavigation();
    return (
  
            <TouchableOpacity
            style={styles.btn}
            onPress={() => {
                navigation.navigate('Single_Deck')
            }}>
                <Text style={styles.white}>Go back to deck</Text>
            </TouchableOpacity>

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
                

                    {this.state.answer === false &&
                    <SafeAreaView style={styles.centerText}>
                        <Text>{cards[this.state.number].question}</Text>
                        <Button onPress={this.changeState} title="Answer"></Button>
                    </SafeAreaView>
                    }

                    {this.state.answer === true &&
                    <SafeAreaView style={styles.centerText}>
                        <Text>{cards[this.state.number].answer}</Text>
                        <Button onPress={this.changeState} title="Question"></Button>
                    </SafeAreaView>
                    }                    

                    <SafeAreaView style={styles.btnHolder}>
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
                    </SafeAreaView>

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
                </Text>
               <View style={styles.btnHolder}>
               <Nav />
               <TouchableOpacity 
               style={styles.btn}
               onPress={this.restart}>
                   <Text style={styles.white}>
                       Restart Game
                   </Text>
               </TouchableOpacity>
               </View>
               
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
        marginTop: 40,
    },
    centerText: {
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
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
        width: 375,
        marginTop: 120
    },
    btnHolder: {
        marginTop: 20,
        alignItems: "center"
    },
    header: {
        fontSize: 18,
        textAlign: "center",
    },
})

export default connect((state) => ({
    decks: state.standard,
    selected: state.selected
}))(StartGame)