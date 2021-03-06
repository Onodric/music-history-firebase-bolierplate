"use strict";

let firebase = require("firebase/app"),
    fb = require("./fb-getter"),
    fbData = fb();

require("firebase/auth");
require("firebase/database");

var config = {
  apiKey: fbData.key,
  authDomain: fbData.authUrl,
};

console.log("dbCongig: ", config);

firebase.initializeApp(config);

module.exports = firebase;
