import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {registerUser} from "../../actions/authActions";
import logo from '../../assets/logo_dark.png';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
    }

    // if logged in and user navigates to register page, should redirect them to dashboard
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/home");
        }
    }

    // set the new state of errors to perform form validation
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors !== prevState.errors) {
            return {
                errors: nextProps.errors,
            };
        }

        return null;
    }

    // handle input onChange
    onChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    // form submission
    onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        };

        this.props.registerUser(newUser, this.props.history);
    }

    // render the form and errors
    render() {
        const {errors} = this.state;

        return(
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
                            <h4><b>Register</b> below</h4>
                            <p>Already have an account? <Link to="/login">Log in</Link></p>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className={'col'}>
                        <form noValidate onSubmit={this.onSubmit}>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    id="name"
                                    type="text"
                                    placeholder={'e.g. John Appleseed'}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    id="email"
                                    type="email"
                                    placeholder={'e.g. john@email.com'}
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

                            <div className="mb-3">
                                <label htmlFor="password2" className="form-label">Confirm Password</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    id="password2"
                                    type="password"
                                    className={`form-control ${errors.password2 ? 'is-invalid' : ''}`}
                                />
                                {errors.password2 && <div className="invalid-feedback">{errors.password2}</div>}
                            </div>

                            <div className={'mb-3'}>
                                <button type="submit" className="btn btn-primary">Sign up</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {registerUser}
)(withRouter(Register));