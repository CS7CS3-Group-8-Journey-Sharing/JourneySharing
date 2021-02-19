import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";


export default function SignInScreen({ navigation, route}) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

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
        secureTextEntry
      />
      <Button
        type="outline"
        title="Sign in"
        onPress={() => route.params.signIn({ username, password })}
      />
      <View style={{marginVertical: 5}} />
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
