const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');
const passport = require('passport');
const {v4: uuidv4} = require('uuid');

// Post model
const Post = require('../../models/Post');
const User = require('../../models/User');

// Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Posts Works'}));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err =>
            res.status(404).json({nopostfound: 'No post found with that ID'})
        );
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
        const {errors, isValid} = validatePostInput(req.body);

        // Check Validation
        if (!isValid) {
            // If any errors, send back 400 status with errors object
            return res.status(400).json(errors);
        }

        const image = req.body.thumbnail;
        const filename = Date.now() + '-thumbnail-' + uuidv4() + '.jpg';
        const data = image.replace(/^data:image\/\w+;base64,/, '');

        fs.writeFile('./public/' + filename, data, {encoding: 'base64'}, function(err) {
            if (err) {
                console.log('FS Error: ' + err);
            }
        });

        const newPost = new Post({
            thumbnail: filename,
            title: req.body.title,
            text: req.body.text,
            price: Number(req.body.price),
            name: req.body.name,
            user: req.user.id,
        });

        newPost.save().then(post => res.json(post));
    }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                // Check for post owner
                if (post.user.toString() !== req.user.id) {
                    return res
                        .status(401)
                        .json({notauthorized: 'User not authorized'});
                }

                // Delete
                post.remove().then(() => res.json({success: true}));
            })
            .catch(err => res.status(404).json({postnotfound: 'No post found'}));
    }
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
        User.findOne({user: req.user.id}).then(user => {
            Post.findById(req.params.id)
                .then(post => {
                    if (
                        post.likes.filter(like => like.user.toString() === req.user.id)
                            .length > 0
                    ) {
                        return res
                            .status(400)
                            .json({alreadyliked: 'User already liked this post'});
                    }

                    // Add user id to likes array
                    post.likes.unshift({user: req.user.id});

                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({postnotfound: 'No post found'}));
        });
    }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
        User.findOne({user: req.user.id}).then(user => {
            Post.findById(req.params.id)
                .then(post => {
                    if (
                        post.likes.filter(like => like.user.toString() === req.user.id)
                            .length === 0
                    ) {
                        return res
                            .status(400)
                            .json({notliked: 'You have not yet liked this post'});
                    }

                    // Get remove index
                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);

                    // Splice out of array
                    post.likes.splice(removeIndex, 1);

                    // Save
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({postnotfound: 'No post found'}));
        });
    }
);

module.exports = router;
