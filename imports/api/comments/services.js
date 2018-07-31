import {Meteor} from 'meteor/meteor';
import {Comments} from '/db';
import Security from '/imports/api/security';
class CommentService {

    static insertnewcomment(comment,postId) {
        Security.checkLoggedIn(Meteor.userId());//checks users is logged in or not
        comment.userId = Meteor.userId();//add userId to comment array
        comment.postId =postId;//add postId to comment array
        comment.useremail = Meteor.user().emails[0].address;//finds user email address for logged in user
        Comments.insert(comment);//inserts a new post in posts collection
    }

    static deleteacomment(commentId) {
        Security.checkLoggedIn(Meteor.userId());//checks users is logged in or not
        Comments.remove({_id:commentId});
    }

}
export default CommentService;