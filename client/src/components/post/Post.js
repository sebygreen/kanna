import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PostShowcase from "./PostShowcase";
import {Link} from "react-router-dom";
import Spinner from "../common/Spinner";

import { getPost } from "../../actions/postActions";
import MessageForm from './MessageForm';

class Post extends Component {
    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
    }

    render() {
        const { post, loading } = this.props.post;
        let postContent;

        if (post === null || loading || Object.keys(post).length === 0) {
            postContent = <Spinner />
        }
        else {
            postContent = <PostShowcase post={post} showAction={false} />
        }

        return (
            <div className="container mt-5">
                <div className={"row"}>
                    <div className={"col-7"}>
                        <div className={'post'}>
                            <Link to={'/posts'} className={'btn btn-light mb-3'}>
                                <i className="bi bi-arrow-left"/>
                            </Link>
                            {postContent}
                        </div>
                    </div>

                    <div className={"col-5 d-flex flex-column"}>
                        <MessageForm />
                    </div>

                </div>
            </div>
        );
    }
}

Post.protoTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post,
})

export default connect(mapStateToProps, { getPost })(Post);