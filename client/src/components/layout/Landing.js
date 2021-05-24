import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo_dark.png';

class Landing extends Component {
    render() {
        return (
            <div className="container">

                <div className="row justify-content-center" style={{marginTop: '20vh'}}>

                    <div className="col-12 text-center">
                        <img src={logo} alt={'Logo'} height={'50px'} />
                        <h4 className={'mt-5'}>
                            A small marketplace for the distribution of <b>cannabis.</b>
                        </h4>

                        <p>Sorry most EU citizens, maybe next time.</p>
                    </div>

                </div>

                <div className="row justify-content-center mt-4">

                    <div className="col-md-auto">
                        <Link to="/register" className="btn btn-primary btn-lg">Register</Link>
                    </div>

                    <div className="col-md-auto">
                        <Link to="/login" className="btn btn-outline-secondary btn-lg">Log In</Link>
                    </div>

                </div>

            </div>
        );
    }
}

export default Landing;