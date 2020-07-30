import React, { Component } from "react";
import { connect } from "react-redux";
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import {
    purple,
    blue,
    white,
    red,
    green,
} from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/Notifications";

class Quiz extends Component {
    state = {
        showAnswer: false,
        totalQuestions: 0,
        totalAnswered: 0,
        correctCount: 0,
        currentQuestion: 1,
        questionIndex: 0,
    };

    handleToggleAnswer = async () => {
        await this.setState((currentState) => ({
            showAnswer: !currentState.showAnswer,
        }));
    };

    handleAnswerIncorrect = async () => {
        await this.setState((currentState) => ({
            totalAnswered: currentState.totalAnswered + 1,
            currentQuestion: currentState.currentQuestion + 1,
            showAnswer: false,
        }));
    };

    handleAnswerCorrect = async () => {
        await this.setState((currentState) => ({
            totalAnswered: currentState.totalAnswered + 1,
            correctCount: currentState.correctCount + 1,
            currentQuestion: currentState.currentQuestion + 1,
            showAnswer: false,
        }));
    };

    handleRetakeQuiz = async () => {
        await this.setState((currentState) => ({
            showAnswer: false,
            totalQuestions: 0,
            totalAnswered: 0,
            correctCount: 0,
            currentQuestion: 1,
            questionIndex: 0,
        }));
    };

    handleHome = () => {
        const { deckId } = this.props
        this.props.navigation.navigate("DeckDetails", { deckId });
    };

    componentDidMount() {
        clearLocalNotification().then(setLocalNotification);
    }

    render() {
        const { decks, deckId } = this.props;
        const deck = decks[deckId];
        const cards = deck.cards;
        const toggleBtnLabel = this.state.showAnswer
            ? "Hide Answer"
            : "Show Answer";
        const totalQuestions = deck.cards.length;
        const { currentQuestion } = this.state;

        if (currentQuestion > totalQuestions) {
            const quizScore = Number(
                ((this.state.correctCount / totalQuestions) * 100).toFixed(2)
            );

            return (
                <ScrollView>
                    <View style={styles.quizContainer}>
                        <Text style={styles.pageTitle}>
                            {deck.title} : Quiz Complete
                        </Text>
                        <Text style={[styles.sectionHead, { marginTop: 20 }]}>
                            You got {this.state.correctCount} out of{" "}
                            {totalQuestions} correct answers.
                        </Text>
                        <Text style={[styles.sectionHead]}>
                            Your Score : {quizScore}%
                        </Text>

                        <View style={{ marginTop: 25 }}>
                            <TouchableOpacity
                                style={[
                                    styles.btn,
                                    styles.normalBtn,
                                    { justifyContent: "center" },
                                ]}
                                onPress={() => this.handleRetakeQuiz()}
                            >
                                <Text style={styles.btnText}>Retake Quiz</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 25 }}>
                            <TouchableOpacity
                                style={[styles.btn, styles.normalBtn]}
                                onPress={() => this.handleHome()}
                            >
                                <Text style={styles.btnText}>Back to Deck</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            );
        } else {
            return (
                <ScrollView>
                    <View style={styles.quizContainer}>
                        <Text style={styles.pageTitle}>
                            Quiz : {deck.title}
                        </Text>
                        <Text style={styles.sectionHead}>
                            Question {currentQuestion} of {totalQuestions}
                        </Text>

                        <View
                            style={[
                                styles.questionContainer,
                                { marginTop: 20 },
                            ]}
                        >
                            <Text
                                style={{
                                    color: red,
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    paddingLeft: 8,
                                }}
                            >
                                Question:
                            </Text>
                            <Text style={styles.question}>
                                {cards[currentQuestion - 1].question}
                            </Text>
                        </View>
                        {this.state.showAnswer && (
                            <View style={[styles.questionContainer]}>
                                <Text
                                    style={{
                                        color: green,
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        paddingLeft: 8,
                                    }}
                                >
                                    Answer:
                                </Text>
                                <Text style={styles.question}>
                                    {cards[currentQuestion - 1].answer}
                                </Text>
                            </View>
                        )}
                        <View style={{ marginTop: 25 }}>
                            <TouchableOpacity
                                style={[styles.btn, styles.answerBtn]}
                                onPress={() => this.handleToggleAnswer()}
                            >
                                <Text style={styles.btnText}>
                                    {toggleBtnLabel}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[
                                styles.questionContainer,
                                { marginTop: 20 },
                            ]}
                        >
                            <Text
                                style={{
                                    color: purple,
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    paddingLeft: 8,
                                }}
                            >
                                Your guess is:
                            </Text>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    marginTop: 10,
                                }}
                            >
                                <TouchableOpacity
                                    style={[styles.btn, styles.correctBtn]}
                                    onPress={() => this.handleAnswerCorrect()}
                                >
                                    <Text style={styles.btnText}>CORRECT</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.btn, styles.incorrectBtn]}
                                    onPress={() => this.handleAnswerIncorrect()}
                                >
                                    <Text style={styles.btnText}>
                                        INCORRECT
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    quizContainer: {
        flex: 1,
        padding: 5,
        margin: 10,
        alignSelf: "center",
        justifyContent: "center",
        width: "85%",
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: purple,
        textAlign: "center",
        justifyContent: "flex-start",
    },
    sectionHead: {
        fontSize: 14,
        fontWeight: "bold",
        color: purple,
        alignSelf: "center",
    },
    questionContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingLeft: 2,
        margin: 5,
    },
    question: {
        fontSize: 18,
        fontWeight: "bold",
        color: purple,
        marginLeft: 10,
    },
    btn: {
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 40,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    normalBtn: {
        backgroundColor: blue,
        width: "90%",
        alignSelf: "center",
    },
    answerBtn: {
        backgroundColor: blue,
        width: "94%",
        alignSelf: "center",
    },
    btnText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
    correctBtn: {
        backgroundColor: green,
        width: "47%",
        alignSelf: "flex-start",
    },
    incorrectBtn: {
        backgroundColor: red,
        width: "47%",
        alignSelf: "flex-end",
    },
});

function mapStateToProps(state, { navigation, route }) {
    const { deckId } = route.params;
    return {
        deckId,
        decks: state,
        navigation,
    };
}

export default connect(mapStateToProps)(Quiz);
