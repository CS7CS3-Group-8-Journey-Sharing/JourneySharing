import * as React from "react";
import { StyleSheet, View, Alert} from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";

export default function RecoverPasswordScreen({navigation}) {
    const [newPassword, setNewPassword] = React.useState("");
    const [RepeatPassword, setRepeatPassword] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [hidePassword, setHidePassword] = React.useState(true);
    const [passwordEye, setPasswordEye] = React.useState("eyeo");
    // const { recover } = ;
    const createTwoButtonAlert = () =>
    {if (newPassword!=RepeatPassword) {
        Alert.alert(
            "Wrong",
            "The passwords you entered do not match.",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
    }else{
        navigation.navigate("SignIn");
    };}
    
    
    return (
        <View style={styles.container}>
          <Input
            placeholder="Username"
            label="Username"
            value={username}
            onChangeText={setUsername}
          />
          <Input
            placeholder="New Password"
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={hidePassword}
            rightIcon={{
                type: "ant-design",
                name: passwordEye,
                onPress: () => {
                    setHidePassword(!hidePassword);
                    setPasswordEye(hidePassword ? "eye" : "eyeo");
                },
             }} //https://oblador.github.io/react-native-vector-icons/
          />
          <Input
            placeholder="Repeat Password"
            label="Repeat Password"
            value={RepeatPassword}
            onChangeText={setRepeatPassword}
            secureTextEntry={hidePassword}
            rightIcon={{
                type: "ant-design",
                name: passwordEye,
                onPress: () => {
                    setHidePassword(!hidePassword);
                    setPasswordEye(hidePassword ? "eye" : "eyeo");
                },
             }} //https://oblador.github.io/react-native-vector-icons/
          />
          <Button
            type="outline"
            title="Sign in"
            onPress={createTwoButtonAlert}
          />
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  