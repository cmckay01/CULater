import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import SwipeCards from 'react-native-swipe-cards';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, useNavigation } from '@react-navigation/stack';
import { auth, firestore } from './firebaseConfig';
import ProfileScreen from './ProfileScreen';
import Auth, { signOut } from './Auth';
import axios from 'axios';
import CreateProfileScreen from './CreateProfileScreen';
import MyProfileScreen from './MyProfileScreen';
import EditProfileScreen from './EditProfileScreen';


const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    signOut();
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Auth />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main">
          {(props) => <Main {...props} handleLogout={handleLogout} />}
        </Stack.Screen>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
        <Stack.Screen name="MyProfile" component={MyProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Card = ({ name, age, bio, image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image style={styles.cardImage} source={{ uri: image }} />
      <Text style={styles.cardText}>{name}</Text>
      <Text style={styles.cardText}>Age: {age}</Text>
      <Text style={styles.cardText}>Bio: {bio}</Text>
    </TouchableOpacity>
  );
};

const Main = ({ navigation, handleLogout }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('users')
      .onSnapshot((querySnapshot) => {
        const usersData = [];
        querySnapshot.forEach((doc) => {
          if (doc.id !== auth.currentUser.uid) {
            usersData.push({ ...doc.data(), id: doc.id });
          }
        });
        console.log('Fetched users:', usersData);
        setUsers(usersData);
      });

    // Clean up subscription
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSwipeRight = (card) => {
    console.log('You swiped right on ' + card.name);
  };

  const handleSwipeLeft = (card) => {
    console.log('You swiped left on ' + card.name);
  };

  const handleCardPress = (user) => {
    navigation.navigate('Profile', { user });
  };

  const handleCreateProfilePress = () => {
    navigation.navigate('CreateProfile');
  };

  const data = users.map(user => ({
    id: user.id,
    name: user.name,
    age: user.age,
    bio: user.bio,
    image: user.image, // Assuming the user object has an 'image' field
  }));


  return (
    <View style={styles.container}>
      <View style={styles.swipeCardsContainer}>
        <SwipeCards
          cards={data}
          renderCard={(cardData) => (
            <Card {...cardData} onPress={() => handleCardPress(cardData)} />
          )}
          handleYup={handleSwipeRight}
          handleNope={handleSwipeLeft}
          noMoreCards={() => <Text style={{ fontSize: 24 }}>No more cards</Text>}
        />
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyProfile')} style={styles.myProfileButton}>
        <Text>My Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleCreateProfilePress}
        style={styles.createProfileButton}
      >
        <Text>Create Profile</Text>
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
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    width: 330,
    height: 550,
  },
  cardImage: {
    width: 280,
    height: 380,
  },
  cardText: {
    fontSize: 20,
    paddingTop: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  swipeCardsContainer: {
    marginBottom: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  parentContainer: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  createProfileButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  cardText: {
    fontSize: 17,
    paddingTop: 10,
    textAlign: 'center',
  },
  myProfileButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});



/* import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import SwipeCards from 'react-native-swipe-cards';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, useNavigation } from '@react-navigation/stack';
import { auth, firestore } from './firebaseConfig';
import ProfileScreen from './ProfileScreen';
import Auth, { signOut } from './Auth';
import axios from 'axios';
import CreateProfileScreen from './CreateProfileScreen';
import MyProfileScreen from './MyProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import firebase from 'firebase/compat/app';
import { addSwipe } from './firebaseService';


const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    signOut();
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Auth />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main">
          {(props) => <Main {...props} handleLogout={handleLogout} />}
        </Stack.Screen>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
        <Stack.Screen name="MyProfile" component={MyProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Card = ({ name, age, bio, image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image style={styles.thumbnail} source={{ uri: image }} />
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>Age: {age}</Text>
      <Text style={styles.text}>Bio: {bio}</Text>
    </TouchableOpacity>
  );
};

const Main = ({ navigation, handleLogout }) => {
  const [users, setUsers] = useState([]);
  const [swipedUserIds, setSwipedUserIds] = useState([]);

  useEffect(() => {
    const currentUser = auth.currentUser;

    // If we have a current user, we get the previously swiped users
    if (currentUser) {
      const userRef = firestore.collection('users').doc(currentUser.uid);
      userRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (data && data.swipedUserIds) {
            setSwipedUserIds(data.swipedUserIds);
          }
        }
      });
    }

    const unsubscribe = firestore.collection('users').onSnapshot((snapshot) => {
      const fetchedUsers = [];
      snapshot.forEach((doc) => {
        if (doc.id !== auth.currentUser.uid && !swipedUserIds.includes(doc.id)) {
          fetchedUsers.push({ ...doc.data(), id: doc.id });
        }
      });
      setUsers(fetchedUsers);
    });

    return () => {
      unsubscribe();
    };
  }, [swipedUserIds]);

  const handleSwipe = (direction, card) => {
    const userId = card.id;
    setSwipedUserIds((prevIds) => [...prevIds, userId]);
  
    // Update Firestore
    const currentUser = auth.currentUser;
    if (currentUser) {
      addSwipe(currentUser.uid, userId, direction);
    }
  };
  
  const handleSwipeRight = (card) => {
    console.log('You swiped right on ' + card.name);
    handleSwipe('right', card);
  };
  
  const handleSwipeLeft = (card) => {
    console.log('You swiped left on ' + card.name);
    handleSwipe('left', card);
  };
  
  const handleCardPress = (user) => {
    navigation.navigate('Profile', { user });
  };
  
  const handleCreateProfilePress = () => {
    navigation.navigate('CreateProfile');
  };
    const data = users.map(user => ({
      id: user.id,
      name: user.name,
      age: user.age,
      bio: user.bio,
      image: user.image, // Assuming the user object has an 'image' field
    }));
  
    return (
      <View style={styles.container}>
        <View style={styles.swipeCardsContainer}>
          <SwipeCards
            cards={data}
            renderCard={(cardData) => (
              <Card {...cardData} onPress={() => handleCardPress(cardData)} />
            )}
            handleYup={handleSwipeRight}
            handleNope={handleSwipeLeft}
            noMoreCards={() => <Text style={{ fontSize: 24 }}>No more cards</Text>}
          />
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyProfile')} style={styles.myProfileButton}>
          <Text>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCreateProfilePress}
          style={styles.createProfileButton}
        >
          <Text>Create Profile</Text>
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
    card: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#E8E8E8',
      width: 330,
      height: 550,
    },
    cardImage: {
      width: 280,
      height: 380,
    },
    cardText: {
      fontSize: 20,
      paddingTop: 10,
    },
    input: {
      width: 200,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
    },
    swipeCardsContainer: {
      marginBottom: 20,
    },
    logoutButton: {
      position: 'absolute',
      top: 50,
      right: 20,
      backgroundColor: '#ccc',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
    },
    parentContainer: {
      flex: 1,
      backgroundColor: 'lightblue',
    },
    createProfileButton: {
      position: 'absolute',
      bottom: 40,
      backgroundColor: '#ccc',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
    },
    cardText: {
      fontSize: 17,
      paddingTop: 10,
      textAlign: 'center',
    },
    myProfileButton: {
      position: 'absolute',
      top: 50,
      left: 20,
      backgroundColor: '#ccc',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
    },
  }); */