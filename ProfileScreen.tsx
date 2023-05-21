// ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { updateUserProfile, updateUserProfileImage } from './profileApi';
import ImagePicker from 'react-native-image-picker';

const ProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [name, setName] = useState(user.name);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    await updateUserProfile(user.id, { name });
  };

  const pickImage = () => {
    const options = {
      title: 'Select Profile Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        // Pass the image file to updateUserProfileImage
        updateUserProfileImage(user.id, source);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.profileImage} source={{ uri: user.image }} />
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Name"
      />
      <Button title="Update Profile" onPress={handleSubmit} />
      <Button title="Select Profile Image" onPress={pickImage} />
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 280,
    height: 380,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 16,
  },
});

export default ProfileScreen;
