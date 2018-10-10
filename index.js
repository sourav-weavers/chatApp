// import { AppRegistry } from 'react-native';
import registerApp from './registerScreens';

import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyDm2eho-LlSL-5xfY4RSscr4y6D0iGhpvY",
  authDomain: "chatapp-b388b.firebaseapp.com",
  databaseURL: "https://chatapp-b388b.firebaseio.com",
  projectId: "chatapp-b388b",
  storageBucket: "chatapp-b388b.appspot.com",
  messagingSenderId: "412421572889"
})
console.disableYellowBox = true;
registerApp();
