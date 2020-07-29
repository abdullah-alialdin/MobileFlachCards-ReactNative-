import React, { Component } from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { getInitialData } from "../actions";
import { getAllDecks } from "../utils/api";
import {
    purple,
    blue,
    yellow,
} from "../utils/colors";

class Decks extends Component {
    state = {
        decks: "",
    };

    componentDidMount() {
        getAllDecks().then((data) => {
            this.props.dispatch(getInitialData(data));
        });
    }

    showDeckDetails(deckId) {
        this.props.navigation.navigate("DeckDetails", { deckId });
    }

    render() {
        return (
            <ScrollView>
                <View style={{ alignItems: "center" }}>
                    {this.props.decks &&
                        Object.keys(this.props.decks).map((deckId) => (
                            <TouchableOpacity
                                key={deckId}
                                style={styles.deck}
                                onPress={() => {
                                    this.showDeckDetails(deckId);
                                }}
                            >
                                <View style={styles.row}>
                                    <Text style={styles.deckTextPrimary}>
                                        {this.props.decks[deckId].title}
                                    </Text>
                                    <Text style={styles.deckTextSecondary}>
                                        {this.props.decks[deckId].cards
                                            .length === 0
                                            ? " Please Add Cards First"
                                            : this.props.decks[deckId].cards
                                                  .length + " Cards"}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    deck: {
        flex: 1,
        justifyContent: "center",
        margin: 10,
        borderRadius: 5,
    },
    deckTextPrimary: {
        fontSize: 20,
        fontWeight: "bold",
        color: purple,
    },
    deckTextSecondary: {
        fontSize: 14,
        fontWeight: "normal",
        color: blue,
    },
    row: {
        flex: 1,
        padding: 15,
        alignSelf: "stretch",
        alignItems: "center",
        borderRadius: 2,
    },
});

function mapStateToProps(state, { navigation }) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(Decks);
