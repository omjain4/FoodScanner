import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { WEB_CLIENT_ID } from '@env';

interface LoginProps {
  onSwitchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({onSwitchToSignup}) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();


  const onLogin = () => {
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            console.log('No user found for that email.');
          }

          if (error.code === 'auth/wrong-password') {
            console.log('Incorrect password.');
          }

          console.error(error);
        });
    } else {
      console.log('Email and password must not be empty.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles?.heading}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSwitchToSignup} style={styles.switchButton}>
        <Text style={styles.switchButtonText}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'black',
    backgroundColor: '#C8C8C8',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 15,
    marginBottom: 15,
  },
  switchButtonText: {
    color: '#6200ea',
    fontSize: 14,
  },
  heading: {
    fontSize: 30,
    margin: 10,
  },
});

export default Login;