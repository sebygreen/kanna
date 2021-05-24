import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

class MessageItem extends PureComponent {

    render() {
        const message = this.props.message;
        const {user} = this.props.auth;

        return (

            <div className='clearfix'>
                {!message.admin ? (
                    <div className={`${message.name === user.name ? 'border rounded w-75 mb-2 float-end' : 'border rounded w-75 mb-2 float-start'}`} aria-live="assertive" aria-atomic="true">
                        <div className="border-bottom p-2 d-flex justify-content-between">
                            <strong className="me-auto">{message.name}</strong>
                            <small className='text-muted'>{message.timestamp}</small>
                        </div>
                        <div className="p-2">
                            {message.content}
                        </div>
                    </div>
                ) : (
                    <div className="mt-2 mb-2 w-100 text-center float-none">
                        <small className='text-muted'>{message.content}</small>
                    </div>
                )}
            </div>

        );
    }
}

MessageItem.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(MessageItem);