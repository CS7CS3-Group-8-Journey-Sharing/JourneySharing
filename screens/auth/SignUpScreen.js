import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";

export default function SignUpScreen({ route }) {
  const [firstname, setFirstname] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hidePassword, setHidePassword] = React.useState(true);
  const [passwordEye, setPasswordEye] = React.useState("eyeo");

  return (
    <View style={styles.container}>
      <Input
        placeholder="First Name"
        value={firstname}
        onChangeText={setFirstname}
      />
      <Input
        placeholder="Surname"
        value={surname}
        onChangeText={setSurname}
      />
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry = {hidePassword}
        rightIcon={{ type: "ant-design", name: passwordEye, onPress: () => {setHidePassword(!hidePassword); setPasswordEye(hidePassword ? "eye" : "eyeo")} }} //https://oblador.github.io/react-native-vector-icons/
      />
      <Button
        type="outline"
        title="Sign Up"
        onPress={() => route.params.signUp({ firstname, surname, username, password })}
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
