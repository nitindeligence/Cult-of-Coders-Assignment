import {Meteor} from 'meteor/meteor';
import Security from '/imports/api/security';
import CommentService from './services.js';
Meteor.methods({
	
    'secured.comment_insert'(comment,postId) {
        Security.checkLoggedIn(Meteor.userId());//checks wether user is logged in or not
        CommentService.insertnewcomment(comment,postId);
    },

    'secured.deletecomment'(commentId){
        CommentService.deleteacomment(commentId);//deletes comment with specified id
    },

});