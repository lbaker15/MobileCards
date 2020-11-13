import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, Dimensions, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
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


class EndGame extends React.Component { 
    render() {
        if (this.props.dark) {
         return (
            <View style={styles.fullView}>

                <Text style={styles.header}>
                    End of game!
                    You scored {this.props.correct} out of {this.props.total}.
                </Text>
                <View style={styles.btnHolder}>
                
                <Nav darkMode={this.props.dark} />
                
                <TouchableOpacity 
                onPress={() => {
                    this.props.reset()
                }}>
                    <LinearGradient
                        colors={["rgba(66,105,255,1)", "rgba(91,50,255,1)"]}
                        locations={[0, 1.0]} 
                        start={{x: 1, y: 0.5}}
                        style={styles.btn}
                        >
                    <Text style={styles.white}>
                        Restart Game
                    </Text>
                    </LinearGradient>
                </TouchableOpacity>

                </View>
                
            </View>
        )
        } else {
            return (
                <View style={styles.fullViewWhite}>

                <Text style={styles.headerWhite}>
                    End of game!
                    You scored {this.props.correct} out of {this.props.total}.
                </Text>
                <View style={styles.btnHolder}>
                
                <Nav darkMode={this.props.dark} />
                
                <TouchableOpacity 
                onPress={() => {
                    this.props.reset()
                }}>
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
    dark: state.darkMode,
}))(EndGame)