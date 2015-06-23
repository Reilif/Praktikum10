var React = require('react');
var FluxCartActions = require('../actions/FluxMailActions');

// Flux product view
var FluxProduct = React.createClass({

  deleteMail: function(event){
    FluxCartActions.deleteMail(this.props.mail);
  },

  moveMail: function(event){
    var newFolder = window.prompt("Verschiebe Mail in Ordner",this.props.mail.folder);
    FluxCartActions.moveMail(this.props.mail, newFolder);
  },

  render: function () {
    return (
        <div className="mail">
          <button className="roundButton" onclick="this.deleteMail()">X</button>
          <button className="roundButton" onclick="this.moveMail()">E</button>
          <h2 className="mailSubject">{this.props.mail.subject}</h2>
          <p>{this.props.mail.sender}</p>

        </div>
    );
  }

});

module.exports = FluxProduct;