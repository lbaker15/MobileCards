import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {getDecksPre} from '../actions/getDecks'
import { useNavigation } from '@react-navigation/native';
import {getSinglePre} from '../actions/getSingle'
import { connect } from 'react-redux';
import {deleteDeckPre} from '../actions/deleteDeck'

const Nav = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.center}>
            <TouchableOpacity
            style={styles.btn}
            onPress={() => {
                navigation.navigate('Single_Deck')
                props.handle(props.title)
            }}>
                <Text>Go to deck</Text>
            </TouchableOpacity>
        </View>
    )
}

class DeckList extends React.Component {
    componentDidMount() {
        this.props.dispatch(getDecksPre())        
    }
    handlePress = (title) => {
        this.props.dispatch(getSinglePre(title))
    }
    delete = (title) => {
        this.props.dispatch(deleteDeckPre(title))
    }
    render() {
        const {decks} = this.props
        console.log(decks)
        return (
            <ScrollView>
                <View>
                    <Text>
                    {decks.length > 1 &&
                        Object.values(decks[0]).map(x => {
                            return (
                                <View style={styles.boxes} key={x.title}>                                               
                                        <View>
                                        <Text>
                                            {x.title}
                                            <Nav title={x.title} handle={this.handlePress} />
                                            <TouchableOpacity 
                                            style={styles.btn}
                                            onPress={() => this.delete(x.title)}>
                                            <Text>Delete Deck</Text>
                                            </TouchableOpacity>
                                        </Text>
                                        </View>  
                                                             
                                </View>
                            )
                        })
                        
                    }
                    </Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        fontSize: 14,
        padding: 10,
        marginTop: 20, 
        borderRadius: 10, 
        color: "white", 
        width: 200,
        backgroundColor: "#4252ff",
    },  
    header: {
        fontSize: 20,
        paddingLeft: 12.5,
        marginBottom: 20
    },
    boxes: {
        display: "flex",
        paddingLeft: 12.5,
        fontSize: 20,
        marginBottom: 30,
        textAlign: "center",
        marginTop: 30,
    },
    center: {
        display: "flex",
        alignItems:"center",
    }
})

export default connect((state) => ({
    decks: state.standard,
}))(DeckList)