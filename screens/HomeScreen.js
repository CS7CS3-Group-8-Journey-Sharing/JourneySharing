import * as React from 'react';
import { Button, Text, View } from 'react-native';

export default function HomeScreen({ signOut }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Signed in!</Text>
        <Button title="Sign out" onPress={signOut} />
      </View>
    );
  }
  