import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
import AuthContext from "../../context/AuthContext";

export default function SignUpScreen() {
  const [firstname, setFirstname] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hidePassword, setHidePassword] = React.useState(true);
  const [passwordEye, setPasswordEye] = React.useState("eyeo");
  const { signUp } = React.useContext(AuthContext).authFunctions;

  return (
    <View style={styles.container}>
      <Input
        placeholder="First Name"
        label="First Name"
        value={firstname}
        onChangeText={setFirstname}
      />
      <Input
        placeholder="Surname"
        label="Surname"
        value={surname}
        onChangeText={setSurname}
      />
      <Input
        placeholder="Age"
        label="Age"
        value={age}
        onChangeText={setAge}
      />
      <Input
        placeholder="Gender"
        label="Gender"
        value={gender}
        onChangeText={setGender}
      />
      <Input
        placeholder="Username"
        label="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder="Password"
        label="Password"
        value={password}
        onChangeText={setPassword}
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
        title="Sign Up"
        onPress={() => signUp({ firstname, surname, username, password })}
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
