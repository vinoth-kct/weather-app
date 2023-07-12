import firebase from 'firebase/compat/app'; // Update this line
import 'firebase/compat/auth'; // Update this line
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

export const registerUser = async (username, email, password) => {
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await user.updateProfile({ displayName: username });
    // Additional user data can be saved to Firestore or other storage
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    // Handle successful login
  } catch (error) {
    throw error;
  }
};
