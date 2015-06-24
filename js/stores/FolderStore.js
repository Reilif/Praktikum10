var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('../constants/FluxMailConstants');
var _ = require('underscore');

// Define initial data points
var _folders=[], _selected = null;

// Method to load product data from mock API
function loadFolderData() {
  console.log("Ordner lade..");
  $.ajax({
    url: 'http://localhost:8080/api/folder/',
    dataType: 'json',
    cache: false,
    success: function (data) {
      console.log("Ordner geladen");
      _folders = data;
      FolderStore.emitChange();
    }.bind(this),
    error: function (xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this)
  });
}

// Method to set the currently selected product variation
function setSelected(folder) {
  _selected = folder;
}

function renameFolder(folder, newName) {
  $.ajax({
    url: 'http://localhost:8080/api/folder/'+folder,
    dataType: 'json',
    cache: false,
    type: 'put',
    data: {newval: newName},
    success: function (data) {
      console.log("Ordner umbenannt");
      loadFolderData();
    }.bind(this),
    error: function (xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this)
  });
}


function deleteFolder(folder) {
  $.ajax({
    url: 'http://localhost:8080/api/folder/'+folder,
    dataType: 'json',
    cache: false,
    type: 'delete',
    success: function (data) {
      console.log("Ordner gelöscht");
      loadFolderData();
    }.bind(this),
    error: function (xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this)
  });
}


// Extend FolderStore with EventEmitter to add eventing capabilities
var FolderStore = _.extend({}, EventEmitter.prototype, {

  // Return Product data
  getFolders: function() {
    return _folders;
  },

  // Return selected Product
  getSelected: function(){
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
  var text;

  switch(action.actionType) {

    // Respond to RECEIVE_FOLDER action
    case FluxCartConstants.RECEIVE_FOLDER:
      loadFolderData();
      break;

    // Respond to SELECT_PRODUCT action
    case FluxCartConstants.SET_SELECTED_FOLDER:
      setSelected(action.data);
      break;

    case FluxCartConstants.RENAME_FOLDER:
      renameFolder(action.data,action.update);
      break;

    case FluxCartConstants.DELETE_FOLDER:
      deleteFolder(action.data,action.update);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  FolderStore.emitChange();

  return true;

});

module.exports = FolderStore;
