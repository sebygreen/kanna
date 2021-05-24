import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {io} from 'socket.io-client';
import {DateTime} from 'luxon';
import MessageItem from './MessageItem';
const {v4: uuidv4} = require('uuid');

// definitions
let socket;

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: [],
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        socket = io('http://localhost:5000');
        let {user} = this.props.auth;

        socket.emit('joined', {
            _id: uuidv4(),
            admin: true,
            content: user.name + ' has joined the chat'
        });

        // socket listeners
        socket.on('message', (data) => {
            let messages = this.state.messages;
            messages.push(data);
            this.setState({messages: messages});
        });
        socket.on('joined', (data) => {
            let messages = this.state.messages;
            messages.push(data);
            this.setState({messages: messages});
        });
        socket.on('left', (data) => {
            let messages = this.state.messages;
            messages.push(data);
            this.setState({messages: messages});
        });
    }

    onSubmit(event) {
        let {user} = this.props.auth;
        event.preventDefault();
        socket.emit('message', {
            _id: uuidv4() + DateTime.now(),
            admin: false,
            name: user.name,
            timestamp: DateTime.now().toLocaleString(DateTime.DATETIME_MED),
            content: this.state.message,
        });
        this.setState({
            message: '',
        });
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    componentWillUnmount() {
        let {user} = this.props.auth;
        this.setState({
            messages: []
        }); // clear the state storage
        socket.emit('left', {
            _id: uuidv4() + DateTime.now(),
            admin: true,
            content: user.name + ' has left the chat'
        });
        socket.disconnect();
    }

    render() {
        return (

            <>
                <div className={"messaging border rounded mb-2 flex-grow-1 p-2 overflow-scroll"} style={{minHeight: '300px'}}>
                    {this.state.messages.map(message => (
                        <MessageItem key={message.key} message={message} />
                    ))}
                </div>

                <form id="messageForm" noValidate onSubmit={this.onSubmit}>

                    <div className="input-group">
                        <input
                            onChange={this.onChange}
                            type="text"
                            className="form-control"
                            placeholder="Your message..."
                            aria-label="Message to be sent"
                            aria-describedby="button-addon2"
                            name='message'
                        />
                        <button className="btn btn-primary" type="submit" id="button-addon2">
                            Send
                        </button>
                    </div>

                </form>
            </>
        );
    }
}

MessageForm.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(MessageForm);