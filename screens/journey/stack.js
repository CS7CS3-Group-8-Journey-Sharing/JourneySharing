import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FindJourneyScreen from "./FindJourneyScreen";

const JourneyStack = createStackNavigator();

export default function JourneyStackScreen() {
  return (
    <JourneyStack.Navigator>
      <JourneyStack.Screen
        name="Find a Journey"
        component={FindJourneyScreen}
      />
    </JourneyStack.Navigator>
  );
}
