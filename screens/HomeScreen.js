import * as React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

export default function HomeScreen({ signOut }) {
  return (
    <View style={styles.container}>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'center' 
  },
});
  