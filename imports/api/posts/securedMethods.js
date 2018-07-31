import {Meteor} from 'meteor/meteor';
import {Posts} from '/db';
import Security from '/imports/api/security';
import PostService from './services.js';
Meteor.methods({

    'secured.post_create'(post) {//creates Posts
        Security.checkLoggedIn(this.userId);//checks users is logged in or not
        PostService.createPost(post);//inserts a new post in posts collection
    },

    'secured.post_edit'(id,postDetails) { //updates Post
        Security.checkLoggedIn(this.userId);//checks users is logged in or not
        PostService.updatePost(id,postDetails);
    },

    'secured.deletepost'(postId){ //deletes Post
        PostService.deletePost(postId);//deletes post with specific id
    },

    'secured.post_list'() {
        return PostService.getPostList();
    },
    
    'secured.post_get' (_id) {
        return Posts.findOne(_id);// return post with specific id
    },

    'secured.getPost'(postId) {
        return PostService.getSinglePostDetails(postId);
    },

    'secured.updateviews'(postId){
        PostService.updateNoofPostViews(postId);
    },
});