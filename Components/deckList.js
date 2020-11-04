import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet, Text, Button, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import {getDecksPre} from '../actions/getDecks'
import { useNavigation } from '@react-navigation/native';
import {getSinglePre} from '../actions/getSingle'
import { connect } from 'react-redux';
import {deleteDeckPre} from '../actions/deleteDeck'
import { BubblesLoader } from 'react-native-indicator';
import { LinearGradient } from "expo-linear-gradient";




const Nav = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.center}>
            <TouchableOpacity
            onPress={() => {
                navigation.navigate('Single_Deck', props.darkMode)
                props.handle(props.title)
                props.fade()
            }}>
                <LinearGradient
                colors={["rgba(66,105,255,1)", "rgba(91,50,255,1)"]}
                locations={[0, 1.0]} 
                start={{x: 1, y: 0.5}}
                style={styles.btn}
                >
                    {props.darkMode === true && 
                        <Text style={styles.white}>Go to deck</Text>
                    }
                    {props.darkMode === false && 
                        <Text style={styles.whiteLight}>Go to deck</Text>
                    }
                
                </LinearGradient>
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
        fadeAn: new Animated.Value(0),
        dark: true,
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
    handleLight = () => {
        this.setState((prev) => ({
            dark: !prev.dark
        }))
    }
    render() {
        const {decks} = this.props
        if (this.state.dark === true) {
        if (decks[0] !== null & decks[0] !== undefined) {
        return (
            <ScrollView style={styles.contain}>
                <View>
                    <Button onPress={this.handleLight} title="Light Mode"></Button>
                </View>
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
                                            <Nav darkMode={this.state.dark} fade={this.fadeOut} title={x.title} handle={this.handlePress} />
                                        </View>

                                        <View>
                                            <TouchableOpacity 
                                            onPress={() => {
                                                this.delete(x.title)
                                                }}>
                                            <LinearGradient
                                            colors={["rgba(66,105,255,1)", "rgba(91,50,255,1)"]}
                                            locations={[0, 1.0]} 
                                            start={{x: 1, y: 0.5}}
                                            style={styles.btn}
                                            >
                                                <Text style={styles.white}>Delete Deck</Text>
                                            </LinearGradient>
                                            </TouchableOpacity>
                                        </View>                                     
                                                             
                                </Animated.View>
                            )
                        })
                        
                    }
                    </Text>
            </ScrollView>
        )} else {
            return (
                <View style={styles.load}>
                    <BubblesLoader size={70} color={"#4252ff"} dotRadius={15} />
                </View>
            )
        }
    } else {
        return (
            <ScrollView style={styles.containLight}>
                <View>
                    <Button onPress={this.handleLight} title="Dark Mode"></Button>
                </View>
                    <Text style={styles.margin}>
                    {decks[0] !== null & decks[0] !== undefined &&
                        Object.values(decks[0]).map(x => {
                            return (
                                <Animated.View style={[styles.boxesLight, {transform: [{translateX: this.state.fadeAn}]}]} key={x.title}>                                               
                                        
                                        <Text style={styles.largeLight}>
                                            {x.title}
                                        </Text>
                                        <Text style={styles.whiteLight}>{x.questions.length} cards</Text>
                                            
                                        <View>
                                            <Nav darkMode={this.state.dark} fade={this.fadeOut} title={x.title} handle={this.handlePress} />
                                        </View>

                                        <View>
                                            <TouchableOpacity 
                                            onPress={() => {
                                                this.delete(x.title)
                                                }}>
                                            <LinearGradient
                                            colors={["rgba(66,105,255,1)", "rgba(91,50,255,1)"]}
                                            locations={[0, 1.0]} 
                                            start={{x: 1, y: 0.5}}
                                            style={styles.btn}
                                            >
                                                <Text style={styles.whiteLight}>Delete Deck</Text>
                                            </LinearGradient>
                                            </TouchableOpacity>
                                        </View>                                     
                                                             
                                </Animated.View>
                            )
                        })
                        
                    }
                    </Text>
            </ScrollView>
        )
    }
    }
}


/**/


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    load: {
        backgroundColor: "black",
        color: "white",
        height: height,
        marginTop: -80,
        justifyContent: "center",
        alignItems: "center",
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
        borderRadius: 5, 
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
    },


    containLight: {
        backgroundColor: "white",
        color: "black",
    },
    marginLight: {
        marginTop: 20,
    },
    btn: {
        fontSize: 14,
        padding: 10,
        marginTop: 20, 
        borderRadius: 5, 
        color: "white", 
        width: 125,
        backgroundColor: "#4252ff",
    },  
    headerLight: {
        fontSize: 20,
        paddingLeft: 12.5,
        marginBottom: 20
    },
    boxesLight: {
        fontSize: 20,
        textAlign: "center",
        width: width,
        display: "flex",
        alignItems: "center",     
        paddingBottom: 30,
    },
    whiteLight: {
        color: "black",
        textAlign: "center"
    },
    largeLight: {
        fontSize: 18,
        color: "black"
    }
})

export default connect((state) => ({
    decks: state.standard,
}))(DeckList)