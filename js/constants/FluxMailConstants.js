var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
  MAIL_ADD: null,
  MAIL_REMOVE: null,
  MAIL_MOVE: null,
  SET_SELECTED_MAIL: null,
  SET_SELECTED_FOLDER: null,
  RECEIVE_FOLDER: null,
  RECEIVE_MAIL: null,
  RENAME_FOLDER: null,
  DELETE_FOLDER: null
});
