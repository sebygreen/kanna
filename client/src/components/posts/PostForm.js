import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addPost} from "../../actions/postActions";


class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thumbnail: '',
            title: '',
            text: '',
            price: '',
            errors: {},
        }

        this.onFileChange = this.onFileChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    onSubmit(event) {
        event.preventDefault();

        const {user} = this.props.auth;

        const newPost = {
            thumbnail: this.state.thumbnail,
            title: this.state.title,
            text: this.state.text,
            price: this.state.price,
            name: user.name,
        };

        this.props.addPost(newPost);
        this.setState({
            thumbnail: '',
            title: '',
            text: '',
            price: '',
        });
    }

    // handle the image file
    onFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = data => {
            this.setState({thumbnail: data.target.result});
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        const {errors} = this.state;

        return (
            <div className="row">

                <form noValidate onSubmit={this.onSubmit} encType='multipart/form-data'>

                    <legend><strong>New</strong> product</legend>

                    <div className={'row mb-3 d-flex'}>

                        <div className={'col'}>

                            <div className={'mb-3'}>
                                <label htmlFor="thumbnail" className="form-label">Photo</label>

                                <input
                                    onChange={this.onFileChange}
                                    name={'thumbnail'}
                                    id="thumbnail"
                                    type="file"
                                    className={`form-control ${errors.thumbnail ? 'is-invalid' : ''}`}
                                />

                                {errors.thumbnail && <div className="invalid-feedback">{errors.thumbnail}</div>}

                                <div id="thumbnail-tip" className="form-text">
                                    The photo must show your product clearly
                                </div>
                            </div>

                            <div className={'row d-flex'}>
                                <div className={'col-8'}>

                                    <label htmlFor="title" className="form-label">Title</label>

                                    <input
                                        onChange={this.onChange}
                                        value={this.state.title}
                                        name={'title'}
                                        id="title"
                                        type="text"
                                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                        placeholder={'e.g Homegrown Lemon Haze'}
                                    />

                                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}

                                    <div id="title-tip" className="form-text">
                                        Include information such as the strain, if this product is homemade, or if you are reselling a processed product
                                    </div>

                                </div>

                                <div className={'col-4'}>

                                    <label htmlFor="price" className="form-label">Price</label>

                                    <div className={'d-flex align-items-center'}>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.price}
                                            name={'price'}
                                            id="price"
                                            type="number"
                                            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                        />
                                        <p className={'ms-2'} style={{marginBottom: '3px'}}>$/g</p>
                                    </div>

                                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}

                                </div>
                            </div>
                        </div>

                        <div className="col">

                            <label htmlFor="text" className="form-label">Description</label>

                            <textarea
                                placeholder={'Describe your offering...'}
                                name={'text'}
                                value={this.state.text}
                                onChange={this.onChange}
                                className={'form-control align-self-stretch'}
                                style={{resize: 'none', height: 'calc(100% - 32px)'}}
                            />

                            {errors.text && <div className="invalid-feedback">{errors.text}</div>}

                        </div>

                    </div>

                    <button type="submit" className="btn btn-dark">
                        Publish
                    </button>

                </form>

            </div>
        );
    }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {addPost})(PostForm);