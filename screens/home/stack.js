import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import CreateJourneyScreen from "./CreateJourneyScreen";
import ViewTrip from "./ViewTrip";
import { Icon } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../common/colors";

const HomeStack = createStackNavigator();

export default function HomeStackScreen({navigation}) {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
          headerRight: () => (
            <Icon
              size = {40}
              type = "ionicon"
              name = "ios-add"
              color={COLORS.mainColor}
              onPress={() => navigation.navigate('CreateJourney')}
              containerStyle={{ marginRight: 20 }}
            />
          ),
        }}/>
        <HomeStack.Screen name="CreateJourney" component={CreateJourneyScreen} />
        <HomeStack.Screen name="ViewTrip" component={ViewTrip} options={({ route }) => ({ title: route.params.item.title })}/>
      </HomeStack.Navigator>
    );
}