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
    }
}

CommentList.propTypes = {
    history: PropTypes.object,
    commentdata:PropTypes.object,
};

DeleteComment.propTypes = {
    comment: PropTypes.object,
};
