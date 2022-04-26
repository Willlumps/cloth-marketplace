//import firebase from "../src/firebase";

// importScripts('/__/firebase/9.2.0/firebase-app-compat.js');
// importScripts('/__/firebase/9.2.0/firebase-messaging-compat.js');
// importScripts('/__/firebase/init.js');

//const messaging = firebase.messaging();

// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";

importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBniIB6UZj8bB4Xj-z16Bnx_2IE6L7A-rs",
    authDomain: "cloth-marketplace-4e397.firebaseapp.com",
    projectId: "cloth-marketplace-4e397",
    storageBucket: "cloth-marketplace-4e397.appspot.com",
    messagingSenderId: "581049482736",
    appId: "1:581049482736:web:969dff6304dbde61bd3135"
  });

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      //icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });