import {Meteor} from 'meteor/meteor';
import {Posts} from '/db';

Meteor.methods({

    'post.create'(post) {
        Posts.insert(post);//inserts new posts
    },

    'post.list' () {
        return Posts.find().fetch();//sends list of all posts
    },

    'post.edit' (_id, post) {
        Posts.update(_id, {//find the id which you want to update same as where in mysql
            $set: {
                title: post.title, //updates title of the post
                description: post.description,// updates descrip	3rd assignmenttion of the post
                type: post.type // updates type of the post
            }
        });
    },

    'post.get' (_id) {
        return Posts.findOne(_id);
    },

    'post.updateview' (_id) {
        Posts.update({_id:_id},{$inc:{views:1}});//increase no of post view by 1
    },

       Posts.update({_id:_id},{$inc:{views:1}});//increase view by 1 
    },
});
