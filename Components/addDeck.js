import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet, Text, View, Button, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {addDeckPre} from '../actions/addDecks'
import {getSinglePre} from '../actions/getSingle'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";


const Nav = (props) => {
    const navigation = useNavigation()
    return (
        <View style={styles.b}>
        <TouchableOpacity
            onPress={() => {
                props.submit()
                navigation.navigate("Single_Deck")
            }}
        >
            <LinearGradient
            colors={["rgba(66,105,255,1)", "rgba(91,50,255,1)"]}
            locations={[0, 1.0]} 
            start={{x: 1, y: 0.5}}
            style={styles.btn}
            >
            <Text style={styles.white}>Submit</Text>
            </LinearGradient>
        </TouchableOpacity>
        </View>
    )
}

class AddDeck extends React.Component {
    state = {
        title: '',
        isFocused: true,
    }
    handleChange = (e) => {
        this.setState({
            title: e
        })
    }
    submit = () => {
        if (this.state.title.length > 1) {
        const prom = new Promise((res, rej) => {
            res(this.props.dispatch(addDeckPre(this.state.title)))
        })
        .then(() => this.props.dispatch(getSinglePre(this.state.title)))
        }
    }
    handleBlur = () => {
        this.setState((prev) => ({
            isFocused: !prev.isFocused,
        }))
    }
    render() {
        if (this.props.dark === true) {
        return (
            <ScrollView style={styles.bg}>
                <View style={styles.align}>
                    <Text style={styles.header}>Add A New Deck</Text>
                    <Text style={styles.center}>
                        <View>
                        <Text>Deck Title</Text>
                        <TextInput
                        onBlur={this.handleBlur}
                        style={(this.state.isFocused === false && this.state.title.length < 1) ? [styles.input, {borderBottomColor: "red", borderBottomWidth: 0.75}] : [styles.input, {borderBottomColor: "white", borderBottomWidth: 0.75}] }
                        onChangeText={this.handleChange}
                        ></TextInput>
                        <Nav submit={this.submit} />
                        </View>
                    </Text>
                </View>
            </ScrollView>
        )
        } else {
            return (
                <ScrollView style={styles.bgWhite}>
                    <View style={styles.align}>
                        <Text style={styles.headerWhite}>Add A New Deck</Text>
                        <Text style={styles.centerWhite}>
                            <View>
                            <TextInput
                            onBlur={this.handleBlur}
                            style={(this.state.isFocused === false && this.state.title.length < 1) ? [styles.inputWhite, {borderBottomColor: "red", borderBottomWidth: 0.75}] : [styles.inputWhite, {borderBottomColor: "black", borderBottomWidth: 0.75}] }
                            onChangeText={this.handleChange}
                            ></TextInput>
                            <Nav submit={this.submit} />
                            </View>
                        </Text>
                    </View>
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    bg: {
        backgroundColor: 'black',
        color: 'white'
    },
    align: {
        justifyContent: "center",
        marginTop: 90
    },
    input: {
        width: 275, 
        padding: 7.5, 
        marginTop: 0,
        color: "white"
    },
    header: {
        fontSize: 22.5,
        paddingLeft: 12.5,
        marginBottom: 0,
        marginTop: 30,
        textAlign: "center",
        color: 'white'
    },
    center: {
        marginTop: 2,
        textAlign: "center",
        color: 'white'
    },
    btn: {
        fontSize: 14,
        padding: 10,
        marginTop: 30, 
        borderRadius: 5, 
        color: "white", 
        width: 120,
        backgroundColor: "#4252ff",
    },
    white: {
        color: "white",
        textAlign: "center",
    },
    b: {
        width: 275,
        alignItems: "center"
    },

    bgWhite: {
        backgroundColor: 'white',
        color: 'black'
    },
    inputWhite: {
        width: 275, 
        padding: 7.5, 
        marginTop: 0,
        color: "black"
    },
    headerWhite: {
        fontSize: 22.5,
        paddingLeft: 12.5,
        marginBottom: 0,
        marginTop: 30,
        textAlign: "center",
        color: 'black'
    },
    centerWhite: {
        marginTop: 20,
        textAlign: "center",
        color: 'black'
    },
    whiteWhite: {
        color: "black",
        textAlign: "center",
    },
})

export default connect((state) => ({
    decks: state.standard,
    dark: state.darkMode,
}))(AddDeck)