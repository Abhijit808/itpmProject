// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const functions = require("firebase-functions");
const admin = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const admins = require("firebase-admin");
// const app = admin.initializeApp();
admin.initializeApp();
exports.files = onDocumentCreated("/files/{fileid}", async (e: any) => {
  const snap = e.data;

  logger.log(snap.data());
  //let content = event.after.get('cust_name');
  const payload = {

    notification: {
      title: "You have been invited to a trip.",
      body: "HERE",
    },
  };
  try {
    admins
      .messaging()
      .sendToDevice(
        "dRiMvewOK5Y1B-0UpMTpSv:APA91bFVC5-NRQVhecXCTGBh2tTyuH-oYgpVqJjenL04CoNWuaFEc-h0TFhc4ETOODCuPg1a4GvlPERuxK4K5Cgb8NcLHRDW8tPlm0HpknCQiX-lHh-Y6pdNkruJKw56oVIoZImPoLKj",
        payload
      );
    // admin;
  } catch (error) {
    console.log(error);
  }
});
