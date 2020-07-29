import React, { Component } from "react";
import { connect } from "react-redux";
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	TextInput,
} from "react-native";
import {
	purple,
	blue,
	white,
	yellow,
	red,
	hoki,
	pink,
} from "../utils/colors";
import { ScrollView } from "react-native-gesture-handler";
import { addNewCard } from "../actions";
import { createNewCard } from "../utils/api";

class AddCard extends Component {
	state = {
		question: "",
		answer: "",
		disabled: true,
	};

	addQuestion = async(question) => {
		await this.setState(() => ({
			question
		}));
		return this.checkInput() ?
			this.enableSubmit() :
			this.disableSubmit();
	};

	addAnswer = async(answer) => {
		await this.setState(() => ({
			answer
		}));
		return this.checkInput() ?
			this.enableSubmit() :
			this.disableSubmit();
	};

	checkInput() {
		return this.state.question.trim().length > 0 &&
			this.state.answer.trim().length > 0 ?
			true :
			false;
	}

	enableSubmit = () => {
		this.setState({
			disabled: false
		});
	};

	disableSubmit = () => {
		this.setState({
			disabled: true
		});
	};

	submitCard = () => {
		const card = {
			question: this.state.question,
			answer: this.state.answer,
		};

		const {
			deckId
		} = this.props.route.params;
		this.props.dispatch(addNewCard(deckId, card));

		this.setState(() => ({
			question: "",
			answer: "",
			disabled: true,
		}));

		createNewCard(deckId, card);

		this.props.navigation.goBack();
	};

	render() {
		const { deckId, decks } = this.props;
		const deck = decks[deckId];

		return (
      <ScrollView >
			   <View style = {styles.cardContainer} >
			      <Text style = {styles.pageTitle} >
			         Add New Crad to {deck.title}Deck
            </Text>
            <View >
              <Text style = {styles.textSecondary} >
			           Question:
			        </Text>
              <TextInput
                onChangeText = {(value) => this.addQuestion(value)}
			          value = {this.state.question}
			          style = {[styles.textInput]}/>
              <Text style = {styles.textSecondary} >
			           Answer:
			        </Text>
              <TextInput
                onChangeText = {(value) => this.addAnswer(value)}
			          value = {this.state.answer}
			          style = {styles.textInput}/>
            </View>
            <TouchableOpacity
              disabled = {this.state.disabled}
		          onPress = {() => {this.submitCard();}}
		          style = {[styles.btn, styles.submitBtn,
                {backgroundColor: this.state.disabled
                  ? hoki
                  : blue,
                },]}
            >
		        <Text style = {styles.btnText} >
              Submit
            </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		padding: 5,
		margin: 10,
		alignSelf: "center",
		width: "85%",
	},
	pageTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: red,
		textAlign: "center",
		justifyContent: "flex-start",
		marginBottom: 10,
	},
	textInput: {
		fontSize: 20,
    marginBottom: 10,
		alignSelf: "stretch",
		height: 40,
		borderColor: purple,
		borderRadius: 5,
		borderWidth: 1,
	},
	btn: {
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 40,
		borderRadius: 5,
		alignSelf: "stretch",
		justifyContent: "center",
		alignItems: "center",
	},
	submitBtn: {
		backgroundColor: blue,
		alignSelf: "stretch",
		marginTop: 20,
	},
	btnText: {
		color: white,
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
	textSecondary: {
		fontSize: 16,
		fontWeight: "normal",
		color: pink,
    marginBottom: 5,
	},
});

function mapStateToProps(state, {navigation, route}) {
	const { deckId } = route.params;
	return {
		deckId,
		decks: state,
	};
}

export default connect(mapStateToProps)(AddCard);
