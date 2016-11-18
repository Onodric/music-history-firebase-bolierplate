"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db

let $ = require('jquery'),
    firebase = require("./firebaseConfig");

// ****************************************
// DB interaction using Firebase REST API
// ****************************************

function getSongs(callback) {
  return new Promise(function(resolve, reject){
    $.ajax({
// notice the songs.json. This tells firebase what key you want, and what format you need it in!      
      url: "https://musichistorydemo-7f1ee.firebaseio.com/songs.json"
    }).done(function(songData){
      resolve(songData);
    });
  });
}

// POST - Submits data to be processed to a specified resource. Takes one parameter.
function addSong(songFormObj) {
  console.log("  what is happening? addsong: ", songFormObj);
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "https://musichistorydemo-7f1ee.firebaseio.com/songs.json",
      type: "POST",
      data: JSON.stringify(songFormObj),
      dataType: 'json'
    }).done(function (songId) {
      resolve(songId);
    });
  });
}

function deleteSong(songId) {
  console.log("  what is happening? delete: ", songId);
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `https://musichistorydemo-7f1ee.firebaseio.com/songs/${songId}.json`,
      method: "DELETE"
    }).done(function (data) {
      resolve();
    });
  });
}

// GET - Requests/read data from a specified resource
function getSong(songId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `https://musichistorydemo-7f1ee.firebaseio.com/songs/${songId}.json`
    }).done(function (songData) {
      resolve(songData);
    }).fail(function (error) {
      reject(error);
    });
    }
  );
}

// PUT - Update data to a specified resource. Takes two parameters.
function editSong(songFormObj, songId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `https://musichistorydemo-7f1ee.firebaseio.com/songs/${songId}.json`,
      type: 'PUT',
      data: JSON.stringify(songFormObj)
    }).done(function (data) {
      resolve(data);
    });
  });
}

module.exports = {
  getSongs,
  addSong,
  getSong,
  deleteSong,
  editSong
};
