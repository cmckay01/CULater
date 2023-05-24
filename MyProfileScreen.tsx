import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth, firestore } from './firebaseConfig';

const MyProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState(null); // Added this line

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setEmail(user.email); // Set email here

      const unsubscribe = firestore
        .collection('users')
        .doc(user.uid)
        .onSnapshot((documentSnapshot) => {
          setProfile(documentSnapshot.data());
        });

      // Clean up subscription
      return () => {
        unsubscribe();
      };
    }
  }, []);

  if (!profile || !email) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email: {email}</Text>
      <Text style={styles.text}>Name: {profile.name}</Text>
      <Text style={styles.text}>Age: {profile.age}</Text>
      <Text style={styles.text}>Bio: {profile.bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default MyProfileScreen;
