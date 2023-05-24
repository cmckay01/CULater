import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { auth } from './firebaseConfig';
import axios from 'axios';


export const signIn = async (email: string, password: string) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    console.log('User logged in successfully');
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.error('Login error: The email address is not associated with any existing account.');
    } else {
      console.error('Login error:', error.message);
    }
  }
};


export const signOut = async () => {
  try {
    await auth.signOut(); // Replace firebase.auth().signOut() with auth.signOut()
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Logout error:', error.message);
  }
};


const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signIn(email, password);
  };


  /* const handleRegister = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
  
      // Add this code to create a new user object to be sent to the server
      const newUser = {
        email: email,
        displayName: '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      await axios.post('http://localhost:3000/users', newUser);
  
      console.log('User registered successfully');
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  }; */
  

  console.log(auth);

  const handleRegister = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
    
      // Set the user's display name
      await user.updateProfile({ displayName: '' });
  
      // Create a new user object to be sent to the server
      const newUser = {
        email: email,
        displayName: user.displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        image: '',
      };
      // Save the new user document to Firestore
      await firestore.collection('users').doc(user.uid).set(newUser);
    
      console.log('User registered successfully');
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to CUlater!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    width: '100%',
    height: '100%',
    backgroundColor: '#8b0000', // Dark red background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20, // Increased spacing between inputs
  },
  title: {
    fontSize: 24, // Increased text size for the title
    marginBottom: 30, // Increased spacing below the title
  },
  buttonText: {
    fontSize: 18, // Increased text size for the button text
  },
});

export default Auth;


///new

