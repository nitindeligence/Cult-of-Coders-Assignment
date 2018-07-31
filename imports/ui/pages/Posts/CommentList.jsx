import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
class DeleteComment extends React.Component {
   
    constructor() {
        super()
        this.removeComment.bind(this);
    }
    removeComment = () => {
        if (window.confirm('Are you sure you wish to delete this post?'))
            Meteor.call('secured.deletecomment',this.props.comment._id,(err)=>{
                if(err)
                    alert(err.reason);
           
            });
    }

    render()
    {
        return (
            <div>
                {
                    (<button onClick={ this.removeComment } type="button">Delete Comment</button>)
                }
            
            </div>
        );
    }
}
export default class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { CommentList:props.commentdata.cmt }; //assigns comment data to CommentList
        this.state = {postuser:props.commentdata.author._id};//assigns post creater id to postuser
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ CommentList: nextProps.commentdata.cmt });
    }
<<<<<<< HEAD
    render()
=======
    DeleteComment(commentId){
        Meteor.call('secured.deletecomment', commentId,(err)=>{ if(err) {alert(err	3rd assignment.reason);}});
        //deletes the comment
    }
    render() 
>>>>>>> 3da9072517b68c86ca057eaf6e9fab45031ddb85
    {
        const CommentList = this.state.CommentList;
        const postuser=this.state.postuser;
        if(CommentList){
            return (
                <div className="postcmts">
                    {
                        CommentList.map((comment) => {
<<<<<<< HEAD
                            return (
                                <div key={comment._id}>
                                    <p>Comment id:{ comment._id } </p>
                                    <p>Comment :{ comment.comment}</p>
                                    <p>Commented By :{ comment.useremail}</p>
                                    {(Meteor.userId()==comment.userId||Meteor.userId()==postuser)?
                                        <DeleteComment
                                            key={comment._id}
                                            comment = { comment }
                                        /> : ''}
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
        else{
            return ('');
        }
=======
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
>>>>>>> 3ff9bfceb2a13157e27012d88350c887b915e1e7
    }
}

CommentList.propTypes = {
    history: PropTypes.object,
    commentdata:PropTypes.object,
};

DeleteComment.propTypes = {
    comment: PropTypes.object,
};
