const admin = require("firebase-admin");
const credentials = require("./Firebase/proiectpentrutic-firebase-adminsdk-6r7x2-7dd7763b57.json")



admin.initializeApp({

    credential: admin.credential.cert(credentials)

});


const db = admin.firestore();
module.exports = db;