/* import * as ImagePicker from 'expo-image-picker';
import { updateUserProfile, updateUserProfileImage } from './firebase';
import { auth, firestore, storage } from './firebaseConfig';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MyProfileScreen() {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
          console.error('User is not logged in.');
          return;
        }

        const userDoc = await firestore.collection('users').doc(currentUser.uid).get();

        if (!userDoc.exists) {
          console.error('User document does not exist.');
          return;
        }

        const fetchedUser = {
          name: userDoc.data().displayName,
          email: currentUser.email,
          image: userDoc.data().image || '',
        };
        setUserData(fetchedUser);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  if (!userData) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const uploadImageAndUpdateProfile = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const uniqueID = `user_images/${Date.now()}`;
    const ref = storage.ref().child(uniqueID);

    ref.put(blob).then(async (snapshot) => {
      const imageURL = await snapshot.ref.getDownloadURL();
      console.log('Image URL:', imageURL);

      const currentUser = auth.currentUser;
      await updateUserProfileImage(currentUser.uid, imageURL);
      setUserData((prevUserData) => ({
        ...prevUserData,
        image: imageURL,
      }));
    });
  };

  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    };

    let response = await ImagePicker.launchImageLibraryAsync(options);

    if (response.cancelled) {
      console.log('User canceled image picker');
    } else {
      console.log('Image URI: ', response.assets[0].uri);
      uploadImageAndUpdateProfile(response.assets[0].uri);
    }
  };
 */
  import * as ImagePicker from 'expo-image-picker';
  import { updateUserProfile, updateUserProfileImage } from './firebase';
  import React, { useState, useEffect } from 'react';
  import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import { auth, firestore, storage } from './firebaseConfig';
  import firebase from 'firebase/app';
  import 'firebase/functions';
  
  
  export default function MyProfileScreen() {
    const [userData, setUserData] = useState(null);
    const navigation = useNavigation();
  
    const createUser = firebase.functions().httpsCallable('createUser');
  
    const handleSignUp = async (email, password, name, age, bio) => {
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
  
        // Call the Cloud Function to create the user document
        const result = await createUser({ name, age, bio });
  
        console.log('User created:', result.data);
  
        // ... other code to handle successful sign up and profile creation
      } catch (error) {
        console.error('Error creating user:', error);
        // ... handle error
      }
    };
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const currentUser = auth.currentUser;
  
          if (!currentUser) {
            console.error('User is not logged in.');
            return;
          }
  
          const userDoc = await firestore.collection('users').doc(currentUser.uid).get();
  
          if (!userDoc.exists) {
            console.error('User document does not exist.');
            return;
          }
  
          const fetchedUser = {
            name: userDoc.data().displayName,
            email: currentUser.email,
            image: userDoc.data().image || '',
          };
          setUserData(fetchedUser);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }, []);
  
  
    const handleEditProfile = () => {
      navigation.navigate('EditProfile');
    };
  
    if (!userData) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Loading...</Text>
        </View>
      );
    }
  
    const uploadImageAndUpdateProfile = async (uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      const uniqueID = `user_images/${Date.now()}`;
      const ref = storage.ref().child(uniqueID);
  
      ref.put(blob).then(async (snapshot) => {
        const imageURL = await snapshot.ref.getDownloadURL();
        console.log('Image URL:', imageURL);
  
        const currentUser = auth.currentUser;
        await updateUserProfileImage(currentUser.uid, imageURL);
        setUserData((prevUserData) => ({
          ...prevUserData,
          image: imageURL,
        }));
      });
    };
  
    const openImagePicker = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
  
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      };
  
      let response = await ImagePicker.launchImageLibraryAsync(options);
  
      if (response.cancelled) {
        console.log('User canceled image picker');
      } else {
        console.log('Image URI: ', response.assets[0].uri);
        uploadImageAndUpdateProfile(response.assets[0].uri);
      }
    };
  
    return (
      <View style={styles.container}>
      <Image style={styles.profileImage} source={{ uri: userData.image }} />
      <Text style={styles.profileName}>{userData.displayName}</Text>
      <Text style={styles.profileEmail}>{userData.email}</Text>
      <TouchableOpacity onPress={openImagePicker}>
        <Text>Open Image Picker</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
  },
  editProfileButton: {
    marginTop: 20,
    backgroundColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
