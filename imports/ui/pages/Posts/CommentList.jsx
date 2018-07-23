import React from 'react';
import CommentSchema from '/db/comments/schema';
import { Route } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Comments } from '/db';
import ReactDom from 'react-dom';
class CommentList extends React.Component {
    constructor() {
        super();
        this.state = { comments: null };       
    }
   DeleteComment(commentId){
    Meteor.call('secured.deletecomment', commentId,(err)=>{
    if(err) {alert(err.reason);}
    else { Meteor.call('secured_comment.list',commentId,(err,comments)=>{
            this.setState({comments}); })
            }  
        });
    }

    render() 
    {       
     const { commentlist }  = this.props;      
     if(this.state.comments)
     this.props.commentlist = this.state.comments;
     const {history} = this.props;   
     return (
      <div className="listComment">
        {
         commentlist.map((comment) => {
         return (
                 <div key={comment._id}>
                 <p>User Email:{ comment.useremail } </p>
                 <p>Comment:{ comment.comment}</p>
{(Meteor.userId()==comment.userId || Meteor.userId()==this.props.post.userId)? (<button onClick={() => { if (window.confirm('Are you sure to delete this comment?'))  this.DeleteComment(comment._id);}}>Delete Comment</button>) : ''}
                </div>
                )
         })
        }
        </div>
    )
    }
}


export default withTracker(props => {
    const handle = Meteor.subscribe('comments');
  
    return {
        loading : !handle.ready(),
        commentlist : Comments.find({ postId:props.match.params._id }).fetch(),
        ...props
    }
})(CommentList);