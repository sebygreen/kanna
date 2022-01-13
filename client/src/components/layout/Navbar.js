import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
import { logoutUser } from '../../actions/authActions';

// logo
import logo from '../../assets/logo_dark.png';

class Navbar extends Component {
	onLogoutClick = (event) => {
		// user log out click event
		event.preventDefault(); // default auto redirect
		this.props.logoutUser();
	};

	render() {
		const { isAuthenticated } = this.props.auth;
		const { user } = this.props.auth;
		const authenticatedLinks = (
			<>
				<h2>
					Hey there, <b>{user.name}</b>. Welcome to kanna! 🖖
				</h2>
				<button
					onClick={this.onLogoutClick.bind(this)}
					className={
						'flex justify-center items-center py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75'
					}
				>
					Logout
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 ml-2 opacity-60"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
						/>
					</svg>
				</button>
			</>
		);

		return (
			<nav className={'relative bg-white'}>
				<div className={'max-w-7xl mx-auto px-4 sm:px-6'}>
					<div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-between md:space-x-10">
						<Link to="/" className="h-auto">
							<img
								src={logo}
								alt={'Logo'}
								className="h-6 w-auto sm:h-8"
							/>
						</Link>

						{isAuthenticated ? authenticatedLinks : ''}
					</div>
				</div>
			</nav>
		);
	}
}

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
