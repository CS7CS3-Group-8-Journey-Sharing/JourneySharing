import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";
import AuthContext from "../../context/AuthContext";
import CustomButton from "../../components/CustomButton"

export default function SignUpScreen() {
  const [firstname, setFirstname] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hidePassword, setHidePassword] = React.useState(true);
  const [passwordEye, setPasswordEye] = React.useState("eyeo");
  const [error, setError] = React.useState("");
  const { signUp } = React.useContext(AuthContext).authFunctions;

  return (
    <View style={styles.container}>
      <Input
        placeholder="Email"
        label="Email"
        autoCapitalize='none'
        value={email}
        onChangeText={setEmail}
      />
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
        errorStyle={styles.errorText}
        errorMessage={error.length > 0 ? error : ""}
      />
      <CustomButton
        title="Sign Up"
        onPress={() => signUp({ email: email, firstName: firstname, lastName: surname, password: password }, setError)}
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
  errorText: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  }
});
