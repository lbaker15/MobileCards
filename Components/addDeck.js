import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet, Text, View, Button, StatusBar, TextInput } from 'react-native';
import { connect } from 'react-redux';
import {addDeckPre} from '../actions/addDecks'
import {getSinglePre} from '../actions/getSingle'
import { useNavigation } from '@react-navigation/native';

const Nav = (props) => {
    const navigation = useNavigation()
    return (
        <Button
            title="Submit"
            onPress={() => {
                props.submit()
                navigation.navigate("Single_Deck")
            }}
        />
    )
}

class AddDeck extends React.Component {
    state = {
        title: '',
    }
    handleChange = (e) => {
        this.setState({
            title: e
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
                        <View>
                        <Text>Deck Title</Text>
                        <TextInput
                        style={{backgroundColor: "white", width: 200, padding: 7.5, borderRadius: 15}}
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