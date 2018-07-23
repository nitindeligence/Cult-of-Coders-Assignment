import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {AutoForm, AutoField, LongTextField,ErrorsField} from 'uniforms-unstyled';
import CommentSchema from '/db/comments/schema';
import Security  from '/imports/api/security.js';
import { Posts, Comments } from '/db';
import CommentList from './CommentList';
import ReactDOM from 'react-dom';
class PostView extends React.Component {
componentDidMount() {
    Meteor.call('post.updateview',this.props.match.params._id);
    }
submit = (comin) => { 
    Meteor.call('secured.comment_insert',comin,this.props.post._id,(err) => {
        if (err) {return alert(err.reason);}
        else{        
            }
        });
    };
render() {
        const { history,post,noofcomments } = this.props;
        if(post)
        { 
             return (
             <div className="comm">
              {           
                <div key={post._id}>
                <p>Post id: {post._id} </p>
                <p>Type : { post.type}</p>
                <p>Post title: {post.title}, Post Description: {post.description} </p>
                <p>Views : {post.views } </p>
                <p> Total Comments: {noofcomments}</p>
                <CommentList {...this.props} />
                { Meteor.userId()? 
                    <div className="comin">
                        <AutoForm onSubmit={this.submit} schema={CommentSchema}>
                        <ErrorsField/>
                    <LongTextField name="comment" ref="comment"/>            
                        <button type='submit'>Add Comment</button>
                        </AutoForm>
                    </div>:""}
                <button onClick={() => {
                this.props.history.push("/posts")
                }}>Back to listing </button> 
                </div>
                }
                 </div>
            );
        }
        else
        { return <div>Loading....</div> }
       
    }
}


export default withTracker((props) => {
    const handle = Meteor.subscribe('posts');
    const com=Meteor.subscribe('comments');

    return {
        loading: !handle.ready(),
        post: Posts.findOne({_id:props.match.params._id}),
        noofcomments : Comments.find({postId:props.match.params._id}).count(),
        ...props    
    };
})(PostView);

