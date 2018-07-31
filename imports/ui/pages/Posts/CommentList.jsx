import React from 'react';
import {AutoForm, LongTextField ,ErrorsField} from 'uniforms-unstyled';
import CommentSchema from '/db/comments/schema';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDom from 'react-dom';
export default class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { CommentList:props.commentdata.cmt }; //assigns comment data to CommentList
        this.state = {postuser:props.commentdata.author._id};//assigns post creater id to postuser
    }
    componentWillReceiveProps(nextProps) {
      this.setState({ CommentList: nextProps.commentdata.cmt });// on adding or removing a comment  
    }
    DeleteComment(commentId){
        Meteor.call('secured.deletecomment', commentId,(err)=>{ if(err) {alert(err	3rd assignment.reason);}});
        //deletes the comment
    }
    render() 
    {
        const CommentList = this.state.CommentList;
        const postuser=this.state.postuser;
        if(CommentList){
            return (
                <div className="postcmts">
                    {
                        CommentList.map((comment) => {
                        return (
                            <div key={comment._id}>
                            <p>Comment id:{ comment._id } </p>
                            <p>Comment :{ comment.comment}</p>
                            <p>Commented By :{ comment.useremail}</p>
                            {(Meteor.userId()==comment.userId||Meteor.userId()==postuser)? (<button onClick={() => {if (window.confirm('Are you sure you wish to delete this post?')) this.DeleteComment(comment._id);}}>Remove Comment</button>) : ''}
                            </div>
                        )/pages/post
                        }) 
                    }  
                </div>
                )
            }
            else{
                    return (" ");
            }
    }
}


