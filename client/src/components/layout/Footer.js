import React, { Component } from "react";

// logo
import logo from '../../assets/logo_dark.png';

class Footer extends Component {
    render() {
        return (
            <footer className="pt-4 my-md-5 pt-md-5">
                <div className='container'>
                    <div className="row">
                        <div className="col-12 col-md">
                            <img src={logo} alt={'Logo'} height="16" /><small className="d-block mb-3 text-muted">© 2021 kanna</small>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;