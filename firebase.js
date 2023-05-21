import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import { firestore } from './firebaseConfig'; // Import the firestore instance
import { getFirestore, doc, updateDoc } from 'firebase/firestore';


export async function updateUserProfileImage(userId, imageUrl) {
  try {
    await updateDoc(doc(firestore, 'users', userId), {
      image: imageUrl,
    });
  } catch (error) {
    console.error('Error updating user profile image:', error);
  }
}

