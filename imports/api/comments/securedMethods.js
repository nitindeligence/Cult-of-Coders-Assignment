import {Meteor} from 'meteor/meteor'
import {Comments} from '/db';
import Security from '/imports/api/security';

Meteor.methods({
    'secured_comment.list'(postid) {
         Comments.find({postId:postid}).fetch();//return comments list against postid
    },
    'secured.comment_insert'(comment,postId) {
        Security.checkLoggedIn(this.userId);//checks wether user is logged in or not
        comment.userId = this.userId;
        comment.postId =postId;
        comment.useremail = Meteor.user().emails[0].address;//finds user email address for logged in user
        Comments.insert(comment);//insert comment in comments collection
    },
    'commentcount'(post) {
        return Comments.find({postId:post}).count();//returns the no of comments against specified post
    },
    'secured.deletecomment'(comment){
        Comments.remove({_id:comment});//deletes comment with specified id
    },

});