import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet, Text, View, Button, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {addDeckPre} from '../actions/addDecks'
import {getSinglePre} from '../actions/getSingle'
import { useNavigation } from '@react-navigation/native';

const Nav = (props) => {
    const navigation = useNavigation()
    return (
        <View style={styles.b}>
        <TouchableOpacity
            style={styles.btn}
            onPress={() => {
                props.submit()
                navigation.navigate("Single_Deck")
            }}
        >
            <Text style={styles.white}>Submit</Text>
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
        marginTop: 10,
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
        borderRadius: 10, 
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
    }
})

export default connect((state) => ({
    decks: state.standard,
}))(AddDeck)