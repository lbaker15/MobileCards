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
                correct: prev.correct + 1,
                answer: false,
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
                incorrect: prev.incorrect + 1,
                answer: false,
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
            end: !prev.end,
            correct: 0,
            incorrect: 0
        }))
    }
    
    render() {
        const {decks, selected} = this.props

        if (this.state.end === false) {
        if (decks[0][selected].questions.length !== 0) {
            const cards = decks[0][selected].questions
 
        return (
            <View style={styles.center}>
                <Text style={styles.whiteTop}>{this.state.number + 1} / {this.state.total}</Text>
                

                    {this.state.answer === false &&
                    <SafeAreaView style={styles.centerText}>
                        <Text style={styles.whiteText}>{cards[this.state.number].question}</Text>
                        <TouchableOpacity style={styles.btn} onPress={this.changeState}>
                            <Text style={styles.white}>Answer</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                    }

                    {this.state.answer === true &&
                    <SafeAreaView style={styles.centerText}>
                        <Text style={styles.whiteText}>{cards[this.state.number].answer}</Text>
                        <TouchableOpacity style={styles.btn} onPress={this.changeState}>
                            <Text style={styles.white}>Question</Text>
                        </TouchableOpacity>
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
            return <View style={styles.center}><Text style={styles.white}>No cards have been added :(</Text></View>
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
        height: 600,
        backgroundColor: "black"
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
    whiteText: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        marginBottom: 20,
    },
    whiteTop: {
        color: "white",
        textAlign: "center",
        marginTop: 50,
        fontSize: 20
    },
    fullView: {
        width: 375,
        backgroundColor: "black",
        height: 600,
    },
    btnHolder: {
        marginTop: 20,
        alignItems: "center"
    },
    header: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 100,
        color: "white"
    },
})



export default connect((state) => ({
    decks: state.standard,
    selected: state.selected
}))(StartGame)