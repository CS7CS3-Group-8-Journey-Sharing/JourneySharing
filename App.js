import * as React from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./screens/home/stack";
import JourneyStackScreen from "./screens/journey/stack";
import ProfileStackScreen from "./screens/profile/stack";
import AuthStackScreen from "./screens/auth/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import SplashScreen from "./screens/auth/SplashScreen";
import AuthContext from "./context/AuthContext";
import authReducer from "./context/AuthReducer";
import COLORS from "./common/colors"
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";
import SignUpScreen from "./screens/auth/SignUpScreen";
import { getUserDetails, baseUrl } from "./utils/APIcalls";
import { parseJwt } from "./utils/utilFunctions";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
    username: null,
    notifications: []
  };


  const [state, dispatch] = React.useReducer(authReducer, initialState);

  React.useEffect(() => {
    try {
      console.disableYellowBox = true;
    } catch(e){

    }

    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("jwtToken");
      } catch (e) {
        console.log("Could restore token, error: "+e)
      }

      if(userToken != null){
        const decodedEmail = parseJwt(userToken);
        getUserDetails(decodedEmail, userToken).then(resData => {
          dispatch({ type: "RESTORE_TOKEN", userToken: userToken , user: resData});    
        }).catch((error) => {
          console.log(error);
          dispatch({ type: "SIGN_OUT" });
        });
      } else {
        dispatch({ type: "SIGN_OUT" });
      }
    };

    bootstrapAsync();
  }, []);

  const authFunctions = React.useMemo(
    () => ({
      signIn: async (data, setError) => {
        axios
          .post(
            baseUrl+"login",
            data,
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            var responseData = res.data;
            AsyncStorage.setItem("jwtToken", responseData.jwtToken);
            dispatch({ type: "SIGN_IN", userToken: responseData.jwtToken, user: responseData.user });
          }).catch((error) => {
            console.log("Could not sign in: "+error)
            setError(error);
            dispatch({ type: "SIGN_OUT" });
          });
      },
      signOut: () =>  {
        AsyncStorage.removeItem("jwtToken")
        dispatch({ type: "SIGN_OUT" })
      },
      signUp: async (data, setError) => {
        axios
          .post(
            baseUrl+"signup",
            data,
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            var data = res.data;
            console.log(data);
            AsyncStorage.setItem("jwtToken", data.jwtToken);
            dispatch({ type: "SIGN_IN", userToken: data.jwtToken, user: data.user });
          }).catch(error => {
            var errorMessage = error.response.data.errorMessage;
            errorMessage = errorMessage.substring(1, errorMessage.length-1);
            setError(errorMessage)
            console.log("Could not sign up: "+errorMessage)
            dispatch({ type: "SIGN_OUT" });
          });
      },
      addNotifications: (notifications) =>  {
        dispatch({ type: "ADD_NOTIFICATIONS", notifications: notifications });
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
          <AuthStackScreen />
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
              activeTintColor: COLORS.mainColor,
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
