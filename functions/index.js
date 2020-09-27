// FIREBASE CLOUDFUNCTIONS
// install firebase-tools globally
// run: 'firebase deploy'

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.\
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

const auth = admin.auth();
const db = admin.firestore();

// Add user to Auth and make database item.
exports.addUser = functions.https.onCall((data, context) => {
    return new Promise((resolve, reject) => {
        // TODO: Make Admin check
        if (true) {
            auth.createUser({
                email: data.email,
                password: data.password
            })
                .then((user) => {
                    db.doc(`users/${user.uid}`)
                        .set({
                            name: data.name,
                            email: data.email,
                            id: user.uid,
                            role: data.role,
                            photoUrl: ""
                        })
                        .then(() => resolve())
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        } else {
            reject(new functions.https.HttpsError("unauthenticated", "Request not authorized. User must be a admin to fulfull request."));
        }
    });
});

// changeRole
exports.changeRole = functions.https.onCall(({ id, role }, context) => {
    return new Promise((resolve, reject) => {
        // TODO make Admin check
        if (true) {
            // Set custom claim
            auth.setCustomUserClaims(id, {
                role
            })
                .then(() => {
                    db.doc(`users/${id}`)
                        .update({ role })
                        .then(() => {
                            resolve("Request fulfilled!");
                        });
                })
                .catch((err) => {
                    reject(err);
                });
        } else {
            reject(new functions.https.HttpsError("unauthenticated", "Request not authorized. User must be a admin to fulfull request."));
        }
    });
});
