import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import RecoverPassword from "./RecoverPassword";
const AuthStack = createStackNavigator();

export default function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: "Sign in" }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "Sign up" }}
      />
      <AuthStack.Screen
        name="RecoverPassword"
        component={RecoverPassword}
        options={{ title: "Recover Password" }}
      />
    </AuthStack.Navigator>
  );
}
