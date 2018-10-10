// import { AppRegistry } from 'react-native';
import registerApp from './registerScreens';

import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyAuEQWkpheUi7TWB5j5PwGMaNO1L0sb6sc",
  authDomain: "chatapp2-4514e.firebaseapp.com",
  databaseURL: "https://chatapp2-4514e.firebaseio.com",
  projectId: "chatapp2-4514e",
  storageBucket: "chatapp2-4514e.appspot.com",
  messagingSenderId: "529497189242"
})
console.disableYellowBox = true;
registerApp();
