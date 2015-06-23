var React = require('react');
var FluxCartActions = require('../actions/FluxMailActions');

// Flux product view
var FluxFolder = React.createClass({

  deleteFolder: function(event){
    FluxCartActions.deleteFolder(this.props.folder);
  },

  selectFolder: function(event){
    console.log("Ordner selektiert:" + this.props.folder);
    FluxCartActions.selectFolder(this.props.folder);
  },

  renameFolder: function(event){
    var newFolder = window.prompt("Nenne den Ordner um",this.props.folder);
    FluxCartActions.renameFolder(this.props.folder, newFolder);
  },

  render: function () {
    return (
        <div className="folder" onClick={this.selectFolder}>
          <h4 className="folderName">{this.props.folder}</h4>
          <button className="roundButton" onClick={this.deleteFolder}>X</button>
          <button className="roundButton" onClick={this.renameFolder}>E</button>
        </div>
    );
  }

});

module.exports = FluxFolder;