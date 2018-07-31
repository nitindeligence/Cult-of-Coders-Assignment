import {Meteor} from 'meteor/meteor';
import {Comments} from '/db';

Meteor.methods({
    
    'comment.insert'(comment) {
        Comments.insert(comment);//inserts new comment
    },

    'comment.list' (postid) {
        return Comments.find({postid:postid}).fetch();//sends list of all comments against specified post id
    },

    'comment.edit' (_id,comment) {
        comment.update(_id, {//find the id which you want to update same as where in mysql
            $set: {
                comment: comment.title, //updates comment title
            }
        });
    },

    'comment.remove' (_id) {
        return Comments.remove(_id);//deletes comments with specified Id
    },
});