var React = require('react');
var FluxCartActions = require('../actions/FluxMailActions');

// Flux product view
var FluxDetailMail = React.createClass({

    render: function () {
        return (
            <div>
                <h3>{this.props.mail.subject}</h3>
                <h3>{this.props.mail.sender}</h3>
                <p>{this.props.mail.text}</p>
            </div>
        );
    }

});

module.exports = FluxDetailMail;