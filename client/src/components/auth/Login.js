import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Validator from 'validator';

import {loginUser} from "../../actions/authActions";
import logo from "../../assets/logo_dark.png";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            errors: {},
        };
    }

    // if logged in and user navigates to login page, should redirect them to dashboard
    componentDidMount() {
        this.setState({errors: ''})

        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/posts");
        }
    }

    // set the new state of errors to perform form validation
    /*static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors !== prevState.errors) {
            return {errors: nextProps.errors};
        } else {
            return null;
        }
    }*/

    componentDidUpdate(prevProps, prevState) {
        // authentication
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/posts');
        }
    }

    // handle input onChange
    onChange = (event) => {
        this.setState({[event.target.id]: event.target.value})

    }

    // form submit
    onSubmit = (event) => {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
        };

        this.props.loginUser(userData);
    }

    // render the form and errors
    render() {
        const {errors} = this.state;

        return (
            <div className="container" style={{maxWidth: '370px'}}>

                <div className="row justify-content-center" style={{marginTop: '8vh'}}>
                    <div className={'col'}>
                        <div className={'d-flex justify-content-between'}>
                            <Link to={'/'} className={'btn btn-light mb-5'}>
                                <i className="bi bi-arrow-left"/>
                            </Link>
                            <img src={logo} alt={'Logo'} height={'38'}/>
                        </div>

                        <div>
                            <h4><b>Welcome</b> back</h4>
                            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className={'col'}>
                        <form noValidate onSubmit={this.onSubmit}>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>

                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    id="email"
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                />

                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>

                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    id="password"
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                />

                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>

                            <div className={'mb-3'}>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);