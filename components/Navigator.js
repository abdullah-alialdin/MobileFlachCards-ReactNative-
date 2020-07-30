import "react-native-gesture-handler";
import React, { Component } from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Decks from "./Decks";
import NewDeck from "./NewDeck";
import DeckDetails from "./DeckDetails";
import AddCard from "./AddCard";
import Quiz from "./Quiz";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function Home() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Decks" component={Decks} />
            <Tab.Screen name="Add Deck" component={NewDeck} />
        </Tab.Navigator>
    );
}

export default function Navigator() {
  return (
      <Stack.Navigator headerMode="screen">
          <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="DeckDetails"
              component={DeckDetails}
              options={{
                  headerTitle: "Details",
                  headerStyle: { height: 45 },
                  headerTitleAlign: "center",
              }}
          />
          <Stack.Screen
              name="AddCard"
              component={AddCard}
              options={{
                  headerTitle: "Add Card",
                  headerStyle: { height: 45 },
                  headerTitleAlign: "center",
              }}
          />
          <Stack.Screen
              name="QuizTime"
              component={Quiz}
              options={{
                  headerTitle: "Quiz Time",
                  headerStyle: { height: 45 },
                  headerTitleAlign: "center",
              }}
          />
      </Stack.Navigator>
  );
}
