import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import classnames from "classnames";
import {Link} from "react-router-dom";
import {DateTime} from 'luxon';

import {deletePost, addLike, removeLike} from "../../actions/postActions";

class PostItem extends Component {
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
        const date = DateTime.fromISO(post.createdAt).toLocaleString(DateTime.DATETIME_MED);  // date from mongodb

        return (

            <div className="col-md-6">

                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 h-md-250 position-relative">

                    <div className="col p-4 d-flex flex-column position-static">

                        <strong className="d-inline-block mb-2 text-success">{post.name}</strong>
                        <h3 className="mb-0">{post.title}</h3>
                        <div className="mb-1 text-muted">{date}</div>
                        <p className="card-text mb-4 line-clamp">{post.text}</p>
                        <h3 className="card-title mb-4">${post.price}<small className="text-muted fw-light">/g</small></h3>

                        {showActions ? (

                            <div className='row'>

                                <div className={'col d-flex justify-content-between'}>
                                    <div className={'d-flex'}>
                                        <button
                                            onClick={
                                                this.findUserLike(post.likes) ? (
                                                    this.onUnlikeClick.bind(this, post._id)
                                                ) : (
                                                    this.onLikeClick.bind(this, post._id)
                                                )
                                            }
                                            type="button"
                                            className="btn btn-light me-2"
                                        >
                                            <i
                                                className={classnames('bi bi-hand-thumbs-up-fill me-2', {
                                                    'text-primary': this.findUserLike(post.likes)
                                                })}
                                            />
                                            {post.likes.length}
                                        </button>
                                    </div>

                                    <div>
                                        <Link to={`/posts/${post._id}`} className="btn btn-primary me-2">Read more</Link>

                                        {post.user === auth.user.id ? (
                                            <button
                                                onClick={this.onDeleteClick.bind(this, post._id)}
                                                type="button"
                                                className="btn btn-outline-danger"
                                            >
                                                <i className="bi bi-trash-fill"/>
                                            </button>
                                        ) : null} {/*deleteButton*/}
                                    </div>
                                </div>

                            </div>

                        ) : null} {/*showActions*/}

                    </div>

                    <div className="col-auto d-none d-lg-block">

                        <div title={'Picture of the product'} style={{
                            height: '100%',
                            width: '300px',
                            backgroundImage: 'url(http://localhost:5000/' + post.thumbnail + ')',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}/>

                    </div>

                </div>

            </div>

        );
    }
}

PostItem.defaultProps = {
    showActions: true,
}

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem);