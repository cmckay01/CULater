import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { updateUserProfile } from './firebase'; // Import the updateUserProfile method from firebase.js

export default function EditProfileScreen() {
  const [name, setName] = useState('');

  const handleSaveChanges = async () => {
    try {
      await updateUserProfile({ displayName: name });
      // Navigate back to MyProfileScreen or show success message
    } catch (error) {
      // Handle error or show error message
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Enter your name"
      />
      {/* Add more input fields for other user details */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  saveButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

