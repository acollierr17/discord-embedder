import * as firebase from 'firebase';
import 'firebase/database';
import ReduxSagaFirebase from 'redux-saga-firebase';

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DB,
  projectId: process.env.REACT_APP_PID,
  storageBucket: process.env.REACT_APP_SB,
  messagingSenderId: process.env.REACT_APP_SID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MID,
};

const firebaseApp = firebase.initializeApp(config);
export const reduxSagaFirebase = new ReduxSagaFirebase(firebaseApp);
export const firestore = firebase.firestore();

if (window.location.hostname === 'localhost') {
  // firebase.firestore.setLogLevel('debug');

  firestore.settings({
    host: 'localhost:8080',
    ssl: false,
    experimentalForceLongPolling: true,
  });

  firebase.functions().useFunctionsEmulator('http://localhost:5001');
}

export const messagesCollection = firestore.collection('messages');
export const todosCollection = firestore.collection('todos');
export default firebase;
