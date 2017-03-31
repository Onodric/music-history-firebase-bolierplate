"use strict";

let $ = require('jquery');

let firebase = require("./firebaseConfig"),
    provider = new firebase.auth.GoogleAuthProvider(),
    currentUser = null;

firebase.auth().onAuthStateChanged(function (user) {
  if(user) {
    currentUser = user.uid;
console.log("currentUser Logged IN?: ", currentUser);
  } else {
    currentUser = null;
console.log("currentUser Logged OUT?: ", currentUser);
  }
});

function logInGoogle () {
console.log("Wazzap auth?");
  return firebase.auth().signInWithPopup(provider);
}

function logOut() {
  return firebase.auth().signOut();
}

function getUser () {
  return currentUser;
}

module.exports = {logInGoogle, logOut, getUser};
