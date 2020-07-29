import "react-native-gesture-handler";
import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Constants from "expo-constants";
import { purple } from "./utils/colors";
import Navigator from "./components/Navigator";
import { setLocalNotification } from "./utils/Notifications";

function SatatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar
                transculant
                backgroundColor={backgroundColor}
                {...props}
            />
        </View>
    );
}

export default class App extends Component {
    componentDidMount() {
        setLocalNotification();
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{ flex: 1 }}>
                    <SatatusBar
                        backgroundColor={purple}
                        barStyle="light-content"
                    />
                    <NavigationContainer>
                        <Navigator />
                    </NavigationContainer>
                </View>
            </Provider>
        );
    }
}
