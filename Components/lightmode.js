import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";




const Nav = (props) => {
    const navigation = useNavigation();
    return (
  
            <TouchableOpacity
            onPress={() => {
                navigation.navigate('Single_Deck')
            }}>
            <LinearGradient
            colors={["rgba(66,105,255,1)", "rgba(91,50,255,1)"]}
            locations={[0, 1.0]} 
            start={{x: 1, y: 0.5}}
            style={styles.btn}
            >
                {props.darkMode === true && 
                <Text style={styles.white}>Go back to deck</Text>
                }
                {props.darkMode === false && 
                <Text style={styles.whiteWhite}>Go back to deck</Text>
                }

            </LinearGradient>
            </TouchableOpacity>

    )
}



class LightModeGame extends React.Component {
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
                <View style={styles.centerWhite}>
                    <Text style={styles.whiteTopWhite}>{this.state.number + 1} / {this.state.total}</Text>
                    

                        {this.state.answer === false &&
                        <SafeAreaView style={styles.centerTextWhite}>
                            <Text style={styles.whiteTextWhite}>{cards[this.state.number].question}</Text>
                            <TouchableOpacity onPress={this.changeState}>
                                <LinearGradient
                                colors={["rgba(66,105,255,1)", "rgba(91,50,255,1)"]}
                                locations={[0, 1.0]} 
                                start={{x: 1, y: 0.5}}
                                style={styles.btn}
                                >
                                    <Text style={styles.whiteWhite}>Answer</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </SafeAreaView>
                        }

                        {this.state.answer === true &&
                        <SafeAreaView style={styles.centerTextWhite}>
                            <Text style={styles.whiteTextWhite}>{cards[this.state.number].answer}</Text>
                            <TouchableOpacity onPress={this.changeState}>
                                <LinearGradient
                                colors={["rgba(66,105,255,1)", "rgba(91,50,255,1)"]}
                                locations={[0, 1.0]} 
                                start={{x: 1, y: 0.5}}
                                style={styles.btn}
                                >
                                    <Text style={styles.whiteWhite}>Question</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </SafeAreaView>
                        }                    

                        <SafeAreaView style={styles.btnHolder}>
                        <TouchableOpacity 
                        onPress={this.correct}>
                            <LinearGradient
                            colors={["rgba(66,105,255,1)", "rgba(91,50,255,1)"]}
                            locations={[0, 1.0]} 
                            start={{x: 1, y: 0.5}}
                            style={styles.btn}
                            >
                                <Text style={styles.whiteWhite}>Correct</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={this.incorrect}>
                            <LinearGradient
                            colors={["rgba(66,105,255,1)", "rgba(91,50,255,1)"]}
                            locations={[0, 1.0]} 
                            start={{x: 1, y: 0.5}}
                            style={styles.btn}
                            >
                                <Text style={styles.whiteWhite}>Incorrect</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        </SafeAreaView>

                </View>
            )
            } else {
                return <View style={styles.centerWhite}><Text style={styles.whiteWhite}>No cards have been added :(</Text></View>
            }
        } else {
            return (
                <View style={styles.fullViewWhite}>
                    <Text style={styles.headerWhite}>
                    End of game!
                    You scored {this.state.correct} out of {this.state.total}.
                    </Text>
                <View style={styles.btnHolder}>
                <Nav darkMode={this.props.darkMode} />
                <TouchableOpacity 
                onPress={this.restart}>
                    <LinearGradient
                        colors={["rgba(66,105,255,1)", "rgba(91,50,255,1)"]}
                        locations={[0, 1.0]} 
                        start={{x: 1, y: 0.5}}
                        style={styles.btn}
                        >
                    <Text style={styles.whiteWhite}>
                        Restart Game
                    </Text>
                    </LinearGradient>
                </TouchableOpacity>
                </View>
                
                </View>
            )
        }
    }
}



const styles = StyleSheet.create({
    centerWhite: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: 600,
        backgroundColor: "white"
    },
    centerTextWhite: {
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
    whiteWhite: {
        color: "black",
        textAlign: "center",
    },
    whiteTextWhite: {
        color: "black",
        textAlign: "center",
        fontSize: 20,
        marginBottom: 20,
    },
    whiteTopWhite: {
        color: "black",
        textAlign: "center",
        marginTop: 50,
        fontSize: 20
    },
    fullViewWhite: {
        width: 375,
        backgroundColor: "white",
        height: 600,
    },
    btnHolder: {
        marginTop: 20,
        alignItems: "center"
    },
    headerWhite: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 100,
        color: "black"
    },
})



export default connect((state) => ({
    decks: state.standard,
    selected: state.selected
}))(LightModeGame)