import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";
import AuthContext from "../../context/AuthContext";
import CustomButton from "../../components/CustomButton"

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hidePassword, setHidePassword] = React.useState(true);
  const [passwordEye, setPasswordEye] = React.useState("eyeo");
  const [error, setError] = React.useState("");

  const { signIn } = React.useContext(AuthContext).authFunctions;

  return (
    <View style={styles.container}>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
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
        errorStyle={styles.errorText}
        errorMessage={error ? "Invalid Credentials" : ""}
      />
      <CustomButton
        title="Sign in"
        onPress={() => {
          setError("")
          signIn({ email, password }, setError)
        }}
      />
      <View style={{ marginVertical: 5 }} />
      <CustomButton
        title="New? Create Account"
        onPress={() => navigation.navigate("SignUp")}
      />
      <View style={{ marginVertical: 5 }} />
      <CustomButton
        title="Recover Password"
        onPress={() => navigation.navigate("RecoverPassword")}
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
