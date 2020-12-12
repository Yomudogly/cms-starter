var admin = require("firebase-admin");

var serviceAccount = require("./test-firebase-22eec-firebase-adminsdk-7jixx-53b20ed866.json");

var uid = process.argv[2];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-firebase-22eec.firebaseio.com",
});

admin
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log("custom claims set for user", uid);
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
