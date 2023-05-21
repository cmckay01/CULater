import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EditProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Edit Profile Screen</Text>
      {/* Add your edit profile form here */}
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
});

export default EditProfileScreen;

