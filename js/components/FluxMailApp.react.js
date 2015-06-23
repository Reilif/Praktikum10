var React = require('react');
var MailStore = require('../stores/MailStore');
var FolderStore = require('../stores/FolderStore');
var FolderList = require('./FluxFolderList.react');
var MailList = require('./FluxMailList.react');
var MailDetail = require('./FluxDetailMail.react');

// Method to retrieve state from Stores
function getMailState() {
  return {
    folders: FolderStore.getFolders(),
    mails:MailStore.getMails(),
    selectedMail:MailStore.getSelectedMail(),
    selectedFolder:FolderStore.getSelected()
  };
}

// Define main Controller View
var FluxMailApp = React.createClass({

  // Get initial state from stores
  getInitialState: function() {
    return getMailState();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    FolderStore.addChangeListener(this._onChange);
    MailStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    FolderStore.removeChangeListener(this._onChange);
    MailStore.removeChangeListener(this._onChange);
  },

  // Render our child components, passing state via props
  render: function() {
  	return (
        <div className="fluxMailApp">
          <FolderList folders={this.state.folders}></FolderList>
          <div className="wrapper">
            <MailList mails={this.state.mails}></MailList>
            <MailDetail/>
          </div>
        </div>
  	);
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getMailState());
  }

});

module.exports = FluxMailApp;
