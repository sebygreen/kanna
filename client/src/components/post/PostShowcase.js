import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import classnames from "classnames";

import {deletePost, addLike, removeLike} from "../../actions/postActions";
import {DateTime} from "luxon";

class PostShowcase extends Component {
    onDeleteClick = (id) => {
        this.props.deletePost(id);
    }

    onLikeClick(id) {
        this.props.addLike(id);
    }

    onUnlikeClick(id) {
        this.props.removeLike(id);
    }

    findUserLike(likes) {
        const {auth} = this.props;
        return likes.filter(like => like.user === auth.user.id).length > 0;
    }

    render() {
        const {post, auth, showActions} = this.props;
        const date = DateTime.fromISO(post.createdAt).toLocaleString(DateTime.DATETIME_MED); // date from mongodb

        return (

            <>
                <div className='row'>
                    <div className="col-8">

                        <strong className="d-inline-block mb-2 text-success">{post.name}</strong>
                        <h3 className="mb-0">{post.title}</h3>
                        <div className="mb-1 text-muted">Posted on the <strong>{date}</strong></div>
                        <p className="card-text mb-4">{post.text}</p>
                        <h3 className="card-title mb-5">${post.price}<small className="text-muted fw-light">/g</small></h3>

                    </div>

                    <div className='col-4'>

                        <div className='border rounded' title={'Picture of the product'} style={{
                            height: '200px',
                            backgroundImage: 'url(http://localhost:5000/' + post.thumbnail + ')',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}/>

                    </div>
                </div>

                {showActions ? (

                    <div className='row'>

                        <div className={'col d-flex justify-content-between'}>
                            <button
                                onClick={
                                    this.findUserLike(post.likes) ? (
                                        this.onUnlikeClick.bind(this, post._id)
                                    ) : (
                                        this.onLikeClick.bind(this, post._id)
                                    )
                                }
                                type="button"
                                className="btn btn-light me-2 inline-block"
                            >
                                <i
                                    className={classnames('bi bi-hand-thumbs-up-fill me-2', {
                                        'text-primary': this.findUserLike(post.likes)
                                    })}
                                />
                                {post.likes.length}
                            </button>

                            {post.user === auth.user.id ? (
                                <button
                                    onClick={this.onDeleteClick.bind(this, post._id)}
                                    type="button"
                                    className="btn btn-outline-danger"
                                >
                                    <i className="bi bi-trash-fill me-2"/>
                                    Delete
                                </button>
                            ) : null} {/*deleteButton*/}
                        </div>

                    </div>

                ) : null} {/*showActions*/}

            </>

        );
    }
}

PostShowcase.defaultProps = {
    showActions: true,
}

PostShowcase.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostShowcase);