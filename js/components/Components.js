/**
 * Created by Robin on 23.06.2015.
 */


var mails = [
    {sender: "Pete Hunt", subject: "This is one comment"},
    {sender: "Jordan Walke", subject: "This is *another* comment"}
];

var folders = [
    "Ordner1",
    "Ordner2",
    "Ordner3",
    "Ordner4",
    "Ordner5"
];
var MailApp = React.createClass({

    displayName: 'CommentBox',
    getInitialState: function () {
        return {
            folders: [],
            mails:[],
            selectedMail:{},
            selectedFolder:{}
        };
    },
    loadFoldersFromServer:function(){
        $.ajax({
            url: 'http://192.168.178.24:8080/api/folder',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({folders: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadFoldersFromServer();
    },
    render: function () {

        return (
            <div className="mailApp">
                <FolderList folders={this.state.folders}></FolderList>

                <div className="wrapper">
                    <MailList mails={this.state.mails}></MailList>
                    <MailDetail/>
                </div>

            </div>
        );
    }
});

var FolderList = React.createClass({
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

var MailList = React.createClass({
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

var Mail = React.createClass({
    render: function () {
        return (
            <div className="mail">
                <h2 className="mailSubject">{this.props.mail.subject}</h2>
                {this.props.mail.sender}
            </div>
        );
    }
});

var Folder = React.createClass({
    render: function () {
        return (
            <div className="folder">
                <h4 className="folderName">{this.props.folder}</h4>
                <button>Löschen</button>
                <button>Umbennen</button>
            </div>
        );
    }
});

var MailDetail = React.createClass({
    render: function () {
        return (
            <div className="mailDetail">
                Hello, world! I am a DetailMail.
            </div>
        );
    }
});

var MailForm = React.createClass({
    render: function () {
        return (
            <div className="mailForm">
                Hello, world! I am a CommentForm.
            </div>
        );
    }
});

React.render(
    <MailApp folders={folders}/>,
    document.getElementById('content')
);