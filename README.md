This project is a part of React NanoDegree from Udacity.

### Clone project
You can clone project from https://github.com/abdullah-alialdin/MobileFlachCards-ReactNative-.git

### Install project
Using `npm install`

### Start project
Using `npm start`

### development
This app was tested and developed on an emulator for Android on a Windows machine.

### `expo start`

Runs the app in development mode.

Open Expo Developer tools from "http://localhost:19002/" and then run on your
android emulator.

### App Overview

The primary view, seen when the app loads, is a list of created decks which includes the name of each deck and the number of cards.

The individual deck view includes:

-The deck title
-Number of cards in the deck
-Option to start a quiz for that deck
-Option to add a new question to the deck

The Quiz view starts with a question from the selected deck.
The question is displayed, along with a button to show the answer.
Pressing the 'Show Answer' button displays the answer.
Buttons are included to allow the student to mark their guess as 'Correct' or 'Incorrect'
The view displays the number of questions remaining.
When the last question is answered, a score is displayed.
When the score is displayed, buttons are displayed to either start the quiz over or go back to the Individual Deck view.

The view includes a form for creating a new deck - which should just be an input for the title and a 'Create Deck' button.
