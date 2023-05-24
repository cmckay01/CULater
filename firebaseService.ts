import { firestore } from './firebaseConfig';

export const addSwipe = async (currentUserUid, userId, direction) => {
  const userDocRef = firestore.collection('users').doc(currentUserUid);
  const newSwipeRef = userDocRef.collection('swipes').doc();

  await newSwipeRef.set({
    swipedUserId: userId,
    direction: direction, // 'right' or 'left', based on swipe direction
  });
};