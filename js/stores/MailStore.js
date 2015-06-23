var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxMailConstants = require('../constants/FluxMailConstants');
var _ = require('underscore');

// Define initial data points
var _mails = [], _selected = {};

// Method to load product data from mock API
function loadMails(data) {
  console.log("Mails laden "+data);
  $.ajax({
    url: 'http://192.168.178.24:8080/api/folder/'+data,
    dataType: 'json',
    cache: false,
    success: function (data) {
      console.log("Mails geladen");
      _mails = data;
      MailStore.emitChange();
    }.bind(this),
    error: function (xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this)
  });
}


var MailStore = _.extend({}, EventEmitter.prototype, {

  // Return cart items
  getMails: function() {
    return _mails;
  },


  // Return cart visibility state
  getSelectedMail: function() {
    return _selected;
  },

  // Emit Change event
  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

    // Respond to MAIL_ADD action
    case FluxMailConstants.SET_SELECTED_FOLDER:
      loadMails(action.data);
      break;


    default:
      return true;
  }

  // If action was responded to, emit change event
  MailStore.emitChange();

  return true;

});

module.exports = MailStore;
