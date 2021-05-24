import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from './PostForm';
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";
import {addPost, getPosts} from "../../actions/postActions";

class Posts extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const { user } = this.props.auth;
        const { posts, loading } = this.props.post;
        let postContent;

        if (posts === null || loading) {
            postContent = <Spinner />
        }
        else {
            postContent = <PostFeed posts={posts} />
        }

        return (
            <>
                <div className="container mt-5">

                    <div className="row mb-3">

                        <div className="col-auto border-end pe-5 pt-2">
                            <h4>Hey there,<br /><b>{user.name}</b></h4>
                            <p>Welcome to kanna! 🖖</p>
                        </div>

                        <div className="col ps-5 pb-2">
                            <PostForm />
                        </div>

                    </div>

                    <div className='row'>
                        <div className={'col'}>
                            <h2 className='mb-3'>Products</h2>
                            <div className='post-feed row' data-masonry='{"percentPosition": true}'>
                                {postContent}
                            </div>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, {addPost, getPosts})(Posts);