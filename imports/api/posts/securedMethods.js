import {Meteor} from 'meteor/meteor'
import {Posts,Comments} from '/db';
import Security from '/imports/api/security';

Meteor.methods({
    'secured.post_create'(post) {
     Security.checkLoggedIn(this.userId);//checks users is logged in or not
     post.userId = this.userId;//add userId toi post array
     Posts.insert(post);//inserts a new post in posts collection
    },
    'secured.post_list'() {
      const query = Posts.createQuery({
        title:1,
        createdBy:1,
        views:1,
        type:1,
        description:1,
        author:{
          emails:{
            address:1,
            verified:1,
          },
        },
        cmt:{
          comment: 1,
          userId : 1,
          useremail:1,
        }
      });
    return query.fetch();
    },
    'secured.post_edit'(_id,postData) {
      Posts.update({_id:_id,userId:this.userId},{//checks if userId is same as the post creator and id is equal to _id
        $set:{
          title:postData.title,//sets title of the post
          description:postData.description//set description of the post
            }
      });
    },
    'secured.deletepost' (postId){ 
    Posts.remove({_id:postId});//deletes post with specific id
    },
    'secured.post_get' (_id) {
    return Posts.findOne(_id);// return post with specific id
    },
    'secured.getPost'(postId) {
    const post = Posts.createQuery({
      $filters: {_id: postId},
      title: 1,
      createdBy:1,
      views:1,
      type:1,
      description:1,
      author:{
        emails:{
          address:1,
        },
      },
      cmt:{
        comment:1,
        userId: 1,
        useremail:1,
      },
    });
    return post.fetch();
    },
});