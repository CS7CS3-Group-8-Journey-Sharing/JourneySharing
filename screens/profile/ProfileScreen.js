import * as React from "react";
import { Image, Button, Text, View, StyleSheet } from "react-native";

export default function ProfileScreen({ signOut }) {
  return (
    <View style={styles.container}>
      <Text>My Profile</Text>
      <Image style={styles.profile_image} source={require("../../assets/default-profile.png")}/>
      <Button title="Sign out" onPress={signOut} />
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
  profile_image: {
    width: 200,
    height: 200,
  },
});
