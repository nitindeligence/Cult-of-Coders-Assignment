import {Meteor} from 'meteor/meteor';
import {Posts} from '/db';
import Security from '/imports/api/security';
class PostService {

    static createPost(post) {
        Security.checkLoggedIn(Meteor.userId());//checks users is logged in or not
        post.userId = Meteor.userId();//add userId to post array
        const insertedId = Posts.insert(post);//inserts a new post in posts collection
        return insertedId;
    }
    
    static updatePost(id,postDetails) {
        Security.checkLoggedIn(Meteor.userId());
        const author=Posts.findOne({_id:id}).userId;//finds the userid of the post creater
        if(author==Meteor.userId()){//checks wether the logged in user is actual owner of the post
            Posts.update({_id:id,userId:Meteor.userId()},{
                $set:{
                    title: postDetails.title,
                    type: postDetails.type,
                    description: postDetails.description,
                }
            });
        }
    }

    static deletePost(postId) {
        Security.checkLoggedIn(Meteor.userId());//checks users is logged in or not
        const author=Posts.findOne({_id:postId}).userId;//finds the userid of the post creater
        if(author==Meteor.userId()){//checks wether the logged in user is actual owner of the post
            Posts.remove({_id:postId});
        }
    }

    static getPostList(){
        const query = Posts.createQuery({
            title :1 ,
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
    }

    static getSinglePostDetails(postId){
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
    }

    static updateNoofPostViews(postId){
        Posts.update({_id:postId},{
            $inc:{
                views:1,
            }
        });
    }
}
export default PostService;
