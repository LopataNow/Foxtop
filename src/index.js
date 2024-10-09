import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {combineReducers, compose, applyMiddleware, createStore} from 'redux'
import {reactReduxFirebase, firebaseReducer, getFirebase} from 'react-redux-firebase'
import firebase from './shared/firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import 'firebase/firestore' // <- needed if using firestore
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {HashRouter, Router} from "react-router-dom";
import ReduxThunk from 'redux-thunk';
import {getLocation} from "./protected/places/maps/locationService";

const firebaseConfig = {
  apiKey: "AIzaSyCI0NQ4tT8VILUGE44sho-UKKLIgo3excU",
  authDomain: "tablefox-a9beb.firebaseapp.com",
  databaseURL: "https://tablefox-a9beb.firebaseio.com",
  projectId: "tablefox-a9beb",
  storageBucket: "tablefox-a9beb.appspot.com",
  messagingSenderId: "393222003864"
};

// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  attachAuthIsReady: true, // attaches auth is ready promise to store
  firebaseStateName: 'firebase' // should match the reducer name ('firebase' is default)
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}


const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
})

function createMyStore(initialState = {}) {

  // Add redux Firebase to compose
  const createStoreWithFirebase = createStore(
    rootReducer,
    initialState,
    compose(
      reactReduxFirebase(firebase, config),
      reduxFirestore(firebase),
      applyMiddleware(ReduxThunk.withExtraArgument(getFirebase))
    )
  )


  // Listen for auth ready (promise available on store thanks to attachAuthIsReady: true config option)
  createStoreWithFirebase.firebaseAuthIsReady.then(() => {
    console.log('Auth has loaded') // eslint-disable-line no-console
  })
  return createStoreWithFirebase;
}

const initialState = {}



// Setup react-redux so that connect HOC can be used
const AppWrapper = () => (
  <Provider store={createMyStore(initialState)}>
    <App/>
  </Provider>
);


ReactDOM.render(<AppWrapper/>, document.getElementById('root'));
registerServiceWorker();


