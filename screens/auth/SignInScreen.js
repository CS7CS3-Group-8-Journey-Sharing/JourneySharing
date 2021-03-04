import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import AuthContext from "../../context/AuthContext";

export default function SignInScreen({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hidePassword, setHidePassword] = React.useState(true);
  const [passwordEye, setPasswordEye] = React.useState("eyeo");

  const { signIn } = React.useContext(AuthContext).authFunctions;

  return (
    <View style={styles.container}>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        leftIcon={{ type: "ant-design", name: "user" }}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        leftIcon={{ type: "ant-design", name: "key" }}
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
        onPress={() => signIn({ username, password })}
      />
      <View style={{ marginVertical: 5 }} />
      <Button
        type="outline"
        title="New? Create Account"
        onPress={() => navigation.navigate("SignUp")}
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
