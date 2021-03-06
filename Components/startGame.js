import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, Dimensions, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import LightModeGame from './lightmode';
import { LinearGradient } from "expo-linear-gradient";
import EndGame from './endGame'
import { BubblesLoader } from 'react-native-indicator';


const Incorr = (props) => {
    return (
        <TouchableOpacity 
        style={styles.test}
        onPress={() => {
            if (props.number < props.total - 1) {
                props.incorrect()
            } else {
                new Promise((res) => {res(props.incorrect())})
                .then(() => {
                    props.end()
                })
            }
        }}>
            <LinearGradient
            colors={["rgba(66,105,255,1)", "rgba(91,50,255,1)"]}
            locations={[0, 1.0]} 
            start={{x: 1, y: 0.5}}
            style={styles.btn}
            >
                <Text style={styles.white}>Incorrect</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const Corr = (props) => {
    return (
        <SafeAreaView style={styles.btnHolder}>
            <TouchableOpacity 
                style={styles.test}
                onPress={() => {
                    if (props.number < props.total - 1) {
                        props.correct()
                    } else {
                        new Promise((res) => {res(props.correct())})
                        .then(() => {
                            props.end()
                        })
                    }
                }}>
                    <LinearGradient
                    colors={["rgba(66,105,255,1)", "rgba(91,50,255,1)"]}
                    locations={[0, 1.0]} 
                    start={{x: 1, y: 0.5}}
                    style={styles.btn}
                    >
                        <Text style={styles.white}>Correct</Text>
                    </LinearGradient>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

class StartGame extends React.Component {
    state = {
        answer: false,
        number: 0,
        total: this.props.decks[0][this.props.selected].questions.length,
        correct: 0,
        incorrect: 0,
        loader: false,
        restart: false,
    }

    correct = () => {
        if(this.state.number < this.state.total - 1) {
            this.setState((prev) => ({
                number: prev.number + 1,
                correct: prev.correct + 1,
                answer: false,
                loader: true,
            }))
            setTimeout(() => {
                this.setState({loader: false})
            }, 1000)
        } else {
            this.setState((prev) => ({
                correct: prev.correct + 1
            }))
        }
    }
    incorrect = () => {
        if (this.state.number < this.state.total - 1) {
            this.setState((prev) => ({
                number: prev.number + 1,
                incorrect: prev.incorrect + 1,
                answer: false,
                loader: true
            }))
            setTimeout(() => {
                this.setState({loader: false})
            }, 1000)
        } else {
            this.setState((prev) => ({
                incorrect: prev.incorrect + 1
            }))
        }
    }
    changeState = () => {
        this.setState((prev) => ({
            answer: !prev.answer
        }))
    }

    end = () => {
        new Promise((res, rej) => {
            res(
                this.setState({
                    loader: true,
                })
            )
        })
        .then(() => new Promise((res) => setTimeout(res, 1500)))
        .then(() => {
            this.setState({
                loader: false,
                restart: true,
            })
        })
    }

    reset = () => {
        new Promise((res, rej) => {
            res(
                this.setState({
                    loader: true,
                })
            )
        })
        .then(() => {
            this.setState({
                number: 0,
                correct: 0,
                incorrect: 0,
                restart: false,
            })
        })
        .then(() => new Promise((res) => setTimeout(res, 800)))
        .then(() => {
            this.setState({
                loader: false,
            })
        })
    }
    
    render() {
        console.log("DARK", this.props.dark)
        const {decks, selected, dark} = this.props
        if (dark === true) {
            if (decks[0][selected].questions.length !== 0) {
                const cards = decks[0][selected].questions
    
            return (
                <View style={styles.center}>

                    {this.state.restart === true &&
                        <EndGame reset={this.reset} correct={this.state.correct} incorrect={this.state.incorrect} total={this.state.total} />
                    }
                    <Text style={styles.whiteTop}>{this.state.number + 1} / {this.state.total}</Text>
                    
                    <View style={(this.state.loader === true) ? styles.load : styles.hidden }>
                        <BubblesLoader size={70} color={"#4252ff"} dotRadius={15} />
                    </View>

                        {this.state.answer === false &&
                        <SafeAreaView style={styles.centerText}>
                            <Text style={styles.whiteText}>{cards[this.state.number].question}</Text>
                            <TouchableOpacity onPress={this.changeState}>
                                <LinearGradient
                                colors={["rgba(66,105,255,1)", "rgba(91,50,255,1)"]}
                                locations={[0, 1.0]} 
                                start={{x: 1, y: 0.5}}
                                style={styles.btn}
                                >
                                    <Text style={styles.white}>Answer</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </SafeAreaView>
                        }

                        {this.state.answer === true &&
                        <SafeAreaView style={styles.centerText}>
                            <Text style={styles.whiteText}>{cards[this.state.number].answer}</Text>
                            <TouchableOpacity style={styles.test} onPress={this.changeState}>
                                <LinearGradient
                                colors={["rgba(66,105,255,1)", "rgba(91,50,255,1)"]}
                                locations={[0, 1.0]} 
                                start={{x: 1, y: 0.5}}
                                style={styles.btn}
                                >
                                    <Text style={styles.white}>Question</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </SafeAreaView>
                        }        

                        <View>
                            <Corr end={this.end} total={this.state.total} number={this.state.number} correct={this.correct} incorrect={this.state.incorrect} correctNumber={this.state.correct} />
                            <Incorr end={this.end} total={this.state.total} number={this.state.number} incorrect={this.incorrect} incorrectNumber={this.state.incorrect} correct={this.state.correct} />
                        </View>

                </View>
            )
            } else {
                return <View style={styles.center}><Text style={styles.white}>No cards have been added :(</Text></View>
            }
        } else {
            return <LightModeGame darkMode={this.props.dark} />
        }
    } 
}

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    test: {
        zIndex: 100,
        backgroundColor: "transparent"
    },
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
        marginTop: -50,
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
        zIndex: 1,
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
        marginTop: 50,
        color: "white"
    },
    hidden: {
        opacity: 0,
    },
    load: {
        backgroundColor: "black",
        color: "white",
        height: height,
        width: width,
        marginTop: -100,
        justifyContent: "center",
        alignItems: "center",        
        zIndex: 200,
        position: "absolute"
    },





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
        color: "white",
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
    selected: state.selected,
    dark: state.darkMode,
}))(StartGame)