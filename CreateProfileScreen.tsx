// CreateProfileScreen.tsx
import { auth, firestore } from './firebaseConfig'; // replace './firebaseConfig' with the actual path to your firebase configuration file
import ProfileForm from './ProfileForm';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

const CreateProfileScreen = () => {
  const handleProfileFormSubmit = async (newUser) => {
    await createUser(newUser);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Create Profile</Text>
          <ProfileForm onSubmit={handleProfileFormSubmit} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

async function createUser(newUser) {
  try {
    const user = auth.currentUser;

    if (user) {
      const newUserObject = {
        ...newUser,
        userId: user.uid,
      };

      await firestore.collection('users').doc(user.uid).set(newUserObject);

      console.log('User created:', newUserObject);
    }
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default CreateProfileScreen;




