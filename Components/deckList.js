import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
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
                props.fade()
            }}>
                <Text style={styles.white}>Go to deck</Text>
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
    state = {
        fadeAn: new Animated.Value(0)
    }
    fadeOut = () => {
        Animated.sequence([
            Animated.timing(this.state.fadeAn, {
                toValue: -100,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(this.state.fadeAn, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            })
        ]).start()
    }
    render() {
        const {decks} = this.props
        if (decks[0] !== null & decks[0] !== undefined) {
        return (
            <View style={styles.load}>

            </View>
        )} else {
            return (
                <View style={styles.contain}>
                    <Text></Text>
                </View>
            )
        }
    }
}
/*
                <ScrollView style={styles.contain}>
                    <Text style={styles.margin}>
                    {decks[0] !== null & decks[0] !== undefined &&
                        Object.values(decks[0]).map(x => {
                            return (
                                <Animated.View style={[styles.boxes, {transform: [{translateX: this.state.fadeAn}]}]} key={x.title}>                                               
                                        
                                        <Text style={styles.large}>
                                            {x.title}
                                        </Text>
                                        <Text style={styles.white}>{x.questions.length} cards</Text>
                                            
                                        <View>
                                            <Nav fade={this.fadeOut} title={x.title} handle={this.handlePress} />
                                        </View>

                                        <View>
                                            <TouchableOpacity 
                                            style={styles.btn}
                                            onPress={() => {
                                                this.delete(x.title)
                                                }}>
                                                <Text style={styles.white}>Delete Deck</Text>
                                            </TouchableOpacity>
                                        </View>                                     
                                                             
                                </Animated.View>
                            )
                        })
                        
                    }
                    </Text>
            </ScrollView>
*/
var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    load: {
        backgroundColor: "black",
        color: "white",
        height: 600,
    },
    contain: {
        backgroundColor: "black",
        color: "white",
    },
    margin: {
        marginTop: 20,
    },
    btn: {
        fontSize: 14,
        padding: 10,
        marginTop: 20, 
        borderRadius: 10, 
        color: "white", 
        width: 125,
        backgroundColor: "#4252ff",
    },  
    header: {
        fontSize: 20,
        paddingLeft: 12.5,
        marginBottom: 20
    },
    boxes: {
        fontSize: 20,
        textAlign: "center",
        width: width,
        display: "flex",
        alignItems: "center",     
        paddingBottom: 30,
    },
    white: {
        color: "white",
        textAlign: "center"
    },
    large: {
        fontSize: 18,
        color: "white"
    }
})

export default connect((state) => ({
    decks: state.standard,
}))(DeckList)