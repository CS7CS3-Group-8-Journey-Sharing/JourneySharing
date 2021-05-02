import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Input } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import AuthContext from "../../context/AuthContext";
import CustomButton from "../../components/CustomButton"

export default function SignUpScreen() {
  const [firstname, setFirstname] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("OTHER");
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
      <Text style={{color: "#86939e", fontSize: 16, fontWeight: "bold", paddingLeft: 10, paddingBottom: 5 }}>Gender</Text>
      <DropDownPicker
        //style={{flex: 1, flexGrow: 1}}
        globalTextStyle={{fontSize: 18, color: "#86939e"}}
        style={{ backgroundColor: "#f2f2f2"}}
        label={"Gender"}
        containerStyle={{height: 60, paddingBottom: 20}}
        itemStyle={{ justifyContent: 'flex-start'}}
        items={[
          { label: "Male", value: "MALE" },
          { label: "Female", value: "FEMALE" },
          { label: "Other", value: "OTHER" },
        ]}
        defaultValue={gender}
        dropDownStyle={{ backgroundColor: "#fafafa"}}
        onChangeItem={(item) => setGender(item.value)}
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
        onPress={() => signUp({ email: email, firstName: firstname, lastName: surname, gender: gender, password: password }, setError)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    //alignItems: "center",
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  }
});
