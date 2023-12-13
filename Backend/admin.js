const admin = require('firebase-admin');
const serviceAccount = require("C:/Users/TANISHA JOSHI/OneDrive/Desktop/Chat n More/Backend/firebase-admin-key.json");
// import { getAuth } from "firebase/auth";
try {
  const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://ChatNMore.firebaseio.com'
  });

  console.log('Firebase Admin SDK initialized successfully!');

  function listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    admin.auth().listUsers(1000, nextPageToken)
      .then(function(listUsersResult) {
        listUsersResult.users.forEach(function(userRecord) {
          console.log('user', userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch(function(error) {
        console.log('Error listing users:', error);
      });
  }
  // Start listing users from the beginning, 1000 at a time.
  listAllUsers();

} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
}
