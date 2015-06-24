var React = require('react');
var FluxCartActions = require('../actions/FluxMailActions');
var Mail = require('./FluxMail.react');

// Flux product view
var FluxProduct = React.createClass({

    newMail: function(event){
        var mail = {};
        mail.subject = window.prompt("Betreff");
        mail.sender = window.prompt("Sender");
        mail.rec = window.prompt("Empfänger");
        mail.folder = window.prompt("Ordner");
        mail.text = window.prompt("Text");
        FluxCartActions.addMail(mail);
    },

    render: function () {
        var mailNodes = this.props.mails.map(function (mail) {
            return (
                <Mail mail={mail}/>
            );
        });

        return (
            <div className="mailList">
            <button className="roundButton" onClick={this.newMail}>+</button>
                {mailNodes}
            </div>
        );
    }

});

module.exports = FluxProduct;