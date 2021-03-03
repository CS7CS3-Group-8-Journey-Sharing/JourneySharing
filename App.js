import * as React from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./screens/home/stack";
import JourneyStackScreen from "./screens/journey/stack";
import ProfileStackScreen from "./screens/profile/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import SignInScreen from "./screens/auth/SignInScreen";
import SplashScreen from "./screens/auth/SplashScreen";
import AuthContext from "./context/AuthContext";
import authReducer from "./context/AuthReducer";

import axios from "axios";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
  };

  const [state, dispatch] = React.useReducer(authReducer, initialState);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  // Authentication functions, useMemo is so that we wait until the functions are done
  const authFunctions = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        console.log(JSON.stringify(data));
        var username = data.username;

        /*axios
          .post(
            "http://localhost:8080/api/journeysharing/user/adduser",
            username,
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            var user = res.data;
            dispatch({ type: "SIGN_IN", token: user.id, user: user });
          }).catch(() => {
            console.log(error)
            dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
          });*/

        try {
          await AsyncStorage.setItem({
            userToken: "dummy-auth-token",
          });
        } catch (e) {
          // setting token failed
        }

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  // pass both the authentication functions and the whole context state
  return (
    <AuthContext.Provider value={{ authFunctions, ...state }}>
      <NavigationContainer>
        {state.isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Navigator>
            <Stack.Screen name="Splash" component={SplashScreen} />
          </Stack.Navigator>
        ) : state.userToken == null ? (
          // No token found, user isn't signed in
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: "Sign in",
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? "pop" : "push",
              }}
            />
          </Stack.Navigator>
        ) : (
          // User is signed in
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = "home-outline";
                } else if (route.name === "Profile") {
                  iconName = "person-outline";
                } else if (route.name === "Find Journey") {
                  iconName = "airplane-outline";
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: "green",
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Find Journey" component={JourneyStackScreen} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
