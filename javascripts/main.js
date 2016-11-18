"use strict";

let $ = require('jquery'),
    db = require("./db-interaction"),
    templates = require("./dom-builder"),
    user = require("./user");


// Using the REST API
function loadSongsToDOM() {
  $(".uiContainer--wrapper").html('');
  let currentUser = user.getUser();
  db.getSongs(currentUser)
  .then(function(songData){
    var idArr = Object.keys(songData);
    idArr.forEach(function (key) {
      songData[key].songId = key;
    });
    console.log("got some data: ", songData);
    templates.makeSongList(songData);
  });
}

// Send newSong data to db then reload DOM with updated song data
$(document).on("click", ".save_new_btn", function() {
  console.log("i was clicked too: ", event.target);
  let songObj = buildSongObj();
  db.addSong(songObj)
  .then(function (songId) {
    loadSongsToDOM();
  });
});

// go get the song from database and then populate the form for editing.
$(document).on("click", ".edit-btn", function (event) {
  let songId = $(this).data('edit-id');
  db.getSong(songId)
  .then(function (song) {
    return templates.songForm(song, songId);
  })
  .then(function (finishedForm) {
    $('.uiContainer--wrapper').html(finishedForm);
  });
});

//Save edited song to FB then reload DOM with updated song data
$(document).on("click", ".save_edit_btn", function() {
  console.log("i was clicked: ", event.target);
  let songObj = buildSongObj(),
      songId = $(this).attr('id');
  db.editSong(songObj, songId)
  .then(function (data) {
    loadSongsToDOM();
  });
});

// Remove song then reload the DOM w/out new song
$(document).on("click", ".delete-btn", function () {
  console.log("i was clicked!: ", event.target);
  let songId = $(this).data('delete-id');
  db.deleteSong(songId)
  .then(function () {
    loadSongsToDOM();
  });
});

$("#view-songs").click(function() {
    $(".uiContainer--wrapper").html("");
    loadSongsToDOM();
});

// Helper functions for forms stuff. Nothing related to Firebase
// Build a song obj from form data.
function buildSongObj() {
    let songObj = {
    title: $("#form--title").val(),
    artist: $("#form--artist").val(),
    album: $("#form--album").val(),
    year: $("#form--year").val(),
    uid: user.getUser()
  };
  return songObj;
}

// Load the new song form
$("#add-song").click(function() {
  console.log("clicked add song");
  var songForm = templates.songForm()
  .then(function(songForm) {
    $(".uiContainer--wrapper").html(songForm);
  });
});

$("#auth-btn").click(function () {
console.log("i clicked: ", event.target);
  user.logInGoogle()
  .then(function (result) {
    let user = result.user;
console.log("logged in: ", user.uid);
    $("#auth-btn").addClass("is-hidden");
    $("#logout").removeClass("is-hidden");
    loadSongsToDOM(); //<--Move to auth section after adding login btn
  });
});

$("#logout").click(function () {
console.log("I clicked: ", event.target);
  user.logOut();
  $(".uiContainer--wrapper").html('');
console.log("uiContainer--wrapper: ", $(".uiContainer--wrapper").html());
  $("#auth-btn").removeClass("is-hidden");
  $("#logout").addClass("is-hidden");
});