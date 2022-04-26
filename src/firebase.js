import firebase from 'firebase/app'
import 'firebase/firebase-messaging'

const firebaseConfig = {
    apiKey: "AIzaSyBniIB6UZj8bB4Xj-z16Bnx_2IE6L7A-rs",
    authDomain: "cloth-marketplace-4e397.firebaseapp.com",
    projectId: "cloth-marketplace-4e397",
    storageBucket: "cloth-marketplace-4e397.appspot.com",
    messagingSenderId: "581049482736",
    appId: "1:581049482736:web:969dff6304dbde61bd3135",
};

firebase.initializeApp(firebaseConfig)

export default firebase.messaging()


// export default async function firebaseInitialize (){
//     var firebaseConfig = {
//         apiKey: "AIzaSyBniIB6UZj8bB4Xj-z16Bnx_2IE6L7A-rs",
//             authDomain: "cloth-marketplace-4e397.firebaseapp.com",
//             projectId: "cloth-marketplace-4e397",
//             storageBucket: "cloth-marketplace-4e397.appspot.com",
//             messagingSenderId: "581049482736",
//             appId: "1:581049482736:web:969dff6304dbde61bd3135"
//     }
//     firebase.initializeApp(firebaseConfig)
//      const messaging = firebase.messaging()
        
//     messaging.getToken({ vapidKey: 'BLzVh5nIm3f7TjPOZqq2K1-peaqGFF4Lg2yIF0DYmsupcEju8Oj2hnRV7aNfgSumMOyOpISZoKIaim8kzUofL4k' }).then((currentToken) => {
//         if (currentToken) {
//             sendTokenToServer(currentToken);
//             updateUIForPushEnabled(currentToken);
//           } else {
//             // Show permission request.
//             console.log('No registration token available. Request permission to generate one.');
//             // Show permission UI.
//             updateUIForPushPermissionRequired();
//             setTokenSentToServer(false);
//           }
//         }).catch((err) => {
//           console.log('An error occurred while retrieving token. ', err);
//           showToken('Error retrieving registration token. ', err);
//           setTokenSentToServer(false);
//         });
    
    
    
//     messaging.onMessage(function(payload) {
//         console.log('Receiving foreground message');
//         console.log(payload)
//           var notificationTitle = 'vue-cometchat-firebase';
//         var notificationOptions = {
//           body: payload.data.alert,
//           icon: '',
//         };
      
//         var notification = new Notification(notificationTitle, notificationOptions);
//         notification.onclick = function(event) {
//           notification.close();
//           console.log(event);
//         };
//        });
//     }