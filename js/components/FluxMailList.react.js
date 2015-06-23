var React = require('react');
var FluxCartActions = require('../actions/FluxMailActions');
var Mail = require('./FluxMail.react');

// Flux product view
var FluxProduct = React.createClass({

    render: function () {
        var mailNodes = this.props.mails.map(function (mail) {
            return (
                <Mail mail={mail}/>
            );
        });

        return (
            <div className="mailList">
                {mailNodes}
            </div>
        );
    }

});

module.exports = FluxProduct;