import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import CreateJourneyScreen from "./CreateJourneyScreen";

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="CreateJourney" component={CreateJourneyScreen} />
      </HomeStack.Navigator>
    );
}