import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import * as API from '../utils/api'
import { connect } from 'react-redux';
import {addDeckPre} from '../actions/addDecks'
import {getSinglePre} from '../actions/getSingle'
import { useNavigation } from '@react-navigation/native';

const Nav = (props) => {
    const navigation = useNavigation()
    return (
        <button
            style={{border: "none", cursor: "pointer", background: "#4252ff", marginTop: 20, boxShadow: "2px 2px 10px #4252ff", borderRadius: 10, color: "white", padding: 10, width: 100, margin: "0 auto"}}
            onClick={() => {
                props.submit()
                navigation.navigate("Single_Deck")
            }}
        >Submit</button>
    )
}

class AddDeck extends React.Component {
    state = {
        title: '',
    }
    handleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    submit = () => {
        const prom = new Promise((res, rej) => {
            res(this.props.dispatch(addDeckPre(this.state.title)))
        })
        .then(() => this.props.dispatch(getSinglePre(this.state.title)))
    }
    render() {
        return (
            <ScrollView>
                <View>
                    <Text style={styles.header}>Add A New Deck</Text>
                    <Text style={styles.center}>
                        <div style={{display: "flex", margin: "0 auto", gap: 20, width: 200, flexDirection: "column"}}>
                        <label style={{fontSize: 18}}>Deck Title</label>
                        <input
                        style={{border: "none", padding: 7.5, borderRadius: 15, boxShadow: "2px 2px 10px #c3c3c3"}}
                        value={this.state.title}
                        onChange={(e) => this.handleChange(e)}
                        ></input>
                        <Nav submit={this.submit} />
                        </div>
                    </Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 22.5,
        paddingLeft: 12.5,
        marginBottom: 10,
        marginTop: 30,
        textAlign: "center"
    },
    center: {
        marginTop: 20,
        textAlign: "center",
    }
})

export default connect((state) => ({
    decks: state.standard,
}))(AddDeck)