import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FindJourneyScreen from "./FindJourneyScreen";

const JourneyStack = createStackNavigator();

export default function JourneyStackScreen() {
    return (
        <JourneyStack.Navigator>
            <JourneyStack.Screen name="Journey" component={FindJourneyScreen} />
        </JourneyStack.Navigator>
    );
}