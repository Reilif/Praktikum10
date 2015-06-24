var AppDispatcher = require('../dispatcher/AppDispatcher');
var FluxCartConstants = require('../constants/FluxMailConstants');

// Define action methods
var FluxCartActions = {

  // Receive inital product data
  receiveFolder: function() {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.RECEIVE_FOLDER
    })
  },

  // Set currently selected product variation
  selectFolder: function(folder) {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.SET_SELECTED_FOLDER,
      data: folder
    })
  },

  // Set currently selected product variation
  renameFolder: function(folder, newName) {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.RENAME_FOLDER,
      data: folder,
      update: newName
    })
  },

  // Set currently selected product variation
  deleteFolder: function(folder) {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.DELETE_FOLDER,
      data: folder
    })
  },

  // Add item to cart
  addMail: function(mail) {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.MAIL_ADD,
      data: mail
    })
  },
  // Add item to cart
  deleteMail: function(mail) {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.MAIL_REMOVE,
      data: mail
    })
  },

  moveMail: function(mail, newFolder) {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.MAIL_MOVE,
      data: mail,
      update: newFolder
    })
  },

  selectMail: function(mail) {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.SET_SELECTED_MAIL,
      data: mail
    })
  },

  receiveMails: function(mails) {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.RECEIVE_MAIL,
      data: mails
    })
  }
};

module.exports = FluxCartActions;
