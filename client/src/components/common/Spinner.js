import React, {Component} from 'react';

class Spinner extends Component {
    render() {
        return (
            <div className={'col'}>
                <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
}

export default Spinner;
