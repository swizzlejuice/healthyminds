import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App'; // Import your root component

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaykU2Ty99PM_OZpJv4wRCOtplJL5QH1g",
  authDomain: "healthyminds-45655.firebaseapp.com",
  databaseURL: "https://healthyminds-45655-default-rtdb.firebaseio.com",
  projectId: "healthyminds-45655",
  storageBucket: "healthyminds-45655.appspot.com",
  messagingSenderId: "60888456273",
  appId: "1:60888456273:web:ef45febe6ecf80358f2c70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Router> {/* Wrap your App component with BrowserRouter */}
    <App />
  </Router>,
  document.getElementById('root')
);