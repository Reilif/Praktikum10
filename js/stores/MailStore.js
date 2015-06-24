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
    url: 'http://localhost:8080/api/folder/'+data,
    dataType: 'json',
    cache: false,
    success: function (data) {
      console.log("Mails geladen");
      _mails = data;
      _selected = {};
      MailStore.emitChange();
    }.bind(this),
    error: function (xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this)
  });
}
// Method to load product data from mock API
function selectMail(data) {
  console.log("Mail laden "+data._id);
  $.ajax({
    url: 'http://localhost:8080/api/msg/'+data._id,
    dataType: 'json',
    cache: false,
    success: function (data) {
      console.log("Mail geladen");
      _selected = data;
      MailStore.emitChange();
    }.bind(this),
    error: function (xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this)
  });
}

// Method to load product data from mock API
function deleteMail(mail) {
  console.log("Mail löschen "+mail);
  $.ajax({
    url: 'http://localhost:8080/api/msg/'+mail._id,
    dataType: 'json',
    type:'delete',
    cache: false,
    success: function (data) {
      console.log("Mail gelöscht");
      loadMails(data.folder);
    }.bind(this),
    error: function (xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this)
  });
}

// Method to load product data from mock API
function moveMail(mail, newFolder) {
  console.log("Mail move "+mail);
  $.ajax({
    url: 'http://localhost:8080/api/msg/'+mail._id,
    dataType: 'json',
    type:'put',
    data:{folder: newFolder},
    cache: false,
    success: function (data) {
      console.log("Mail moved");
      _mails = data;
      loadMails(newFolder);
    }.bind(this),
    error: function (xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this)
  });
}


// Method to load product data from mock API
function addMail(mail) {
  console.log("Mail add "+mail);
  var recipients = mail.rec.split(';');
  var paras = {sender: mail.sender, recipients: recipients, text: mail.text,subject: mail.subject,date: mail.date, folder:mail.folder};
  console.log(paras);
  $.ajax({
    url: 'http://localhost:8080/api/msg/',
    dataType: 'json',
    type:'post',
    data: paras,
    cache: false,
    success: function (data) {
      console.log("Mail add");
      _mails = data;
      loadMails(mail.folder);
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

    // Respond to MAIL_ADD action
    case FluxMailConstants.MAIL_MOVE:
      moveMail(action.data, action.update);
      break;

    // Respond to MAIL_ADD action
    case FluxMailConstants.MAIL_REMOVE:
      deleteMail(action.data);
      break;

    // Respond to MAIL_ADD action
    case FluxMailConstants.MAIL_ADD:
      addMail(action.data);
      break;

    case FluxMailConstants.SET_SELECTED_MAIL:
          selectMail(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  MailStore.emitChange();

  return true;

});

module.exports = MailStore;
