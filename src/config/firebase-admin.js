// src/config/firebase-admin.js
const admin = require('firebase-admin');


admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // Es fundamental reemplazar los \n literales por saltos de línea reales ,por eso se pega en una sola linea y se reemplaza con el replace
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  })
});


module.exports = admin;