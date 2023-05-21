/* import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './firebaseConfig';

AppRegistry.registerComponent(appName, () => App);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}




 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './firebaseConfig';
import * as functions from 'firebase-functions';
import { createUser } from './profileApi';

AppRegistry.registerComponent(appName, () => App);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

exports.createUser = functions.https.onCall(createUser);
