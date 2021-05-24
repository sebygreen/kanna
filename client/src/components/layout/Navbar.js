import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
import { logoutUser } from '../../actions/authActions';

// logo
import logo from '../../assets/logo_white.png';

class Navbar extends Component {
    onLogoutClick = (event) => { // user log out click event
        event.preventDefault(); // default auto redirect
        this.props.logoutUser();
    };

    render() {
        const { isAuthenticated} = this.props.auth;
        const authenticatedLinks = (
            <button onClick={this.onLogoutClick.bind(this)} className={'btn btn-outline-danger'}>
                <i className="bi bi-power"/>
            </button>
        )

        return (
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">

                    <Link to="/" className="navbar-brand">
                        <img src={logo} alt={'Logo'} height="22" />
                    </Link>

                    { isAuthenticated ? authenticatedLinks : ''}

                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {logoutUser}
)(Navbar);