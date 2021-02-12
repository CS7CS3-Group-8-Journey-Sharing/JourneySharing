import * as React from 'react';
import { Button, TextInput, StyleSheet, View } from 'react-native';

export default function SignInScreen({ signIn }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
      <View style={styles.container}>
        <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
        />
        <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        <Button title="Sign in" onPress={() => signIn({ username, password })} />
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
  