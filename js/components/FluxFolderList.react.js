var React = require('react');
var FluxCartActions = require('../actions/FluxMailActions');
var Folder = require('./FluxFolder.react');

// Flux product view
var FluxProduct = React.createClass({
  loadFoldersFromServer:function(){
   FluxCartActions.receiveFolder();
  },
  componentDidMount: function () {
    this.loadFoldersFromServer();
  },
  render: function () {
    var folderNodes = this.props.folders.map(function (folder) {
      return (
          <Folder folder={folder}/>
      );
    });

    return (
        <div className="folderList">
          {folderNodes}
        </div>
    );
  }

});

module.exports = FluxProduct;