import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {AutoForm,LongTextField,ErrorsField} from 'uniforms-unstyled';
import CommentSchema from '/db/comments/schema';
import Security  from '/imports/api/security.js';
import { Posts, Comments } from '/db';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import CommentList from './CommentList';
class PostView extends React.Component {
  constructor() {
  super();
  this.state = {postd: null};
  }

  componentDidMount() {
  Meteor.call('post.updateview',this.props.match.params._id);
  //increase the view by one
  }

  submit = (comin) => { 
    this.formRef.reset();//reset the form
    Meteor.call('secured.comment_insert',comin,this.props.match.params._id,(err) =>{
     if (err){return alert(err.reason); }});
  };

  render() {
    const { post,history } = this.props;
    if(this.state.post){this.props.post = this.state.post;}
    if(!post){ 
        return <div>Loading....</div>
    }else{
        return(
                <div className="post">
                {
                post.map((post) => {
                return(
                        <div key={post._id}>
                            <p>Post id: {post._id} </p>
                            <p>Type : { post.type}</p>
                            <p>Post title:{post.title},Post Description:{post.description}</p>
                            <p>Views : {post.views } </p>
                            <p> Total Comments: {post.cmt ? _.size(post.cmt) : 0}</p>
                            { Meteor.userId()? 
                                <div className="comin">
                                <AutoForm onSubmit={this.submit.bind(this)} ref={(ref) => this.formRef = ref} schema={CommentSchema}>
                                <ErrorsField/>
                                    <LongTextField name="comment" ref="comment"/>            
                                    <button type='submit'>Add Comment</button>
                                </AutoForm>
                                </div>:""}
                            <CommentList commentdata={post} />
                            <button onClick={() => {this.props.history.push("/posts")}}>Back to listing</button> 
                        </div>
                      )
                    })
                }
                </div>
        )
        }
    }
}

const pd = new ReactiveVar([]);
export default withTracker(props => {
    const handle = Meteor.subscribe('posts');
    Meteor.subscribe('comments');
    Meteor.call('secured.getPost',props.match.params._id,(err,post)=>{
        pd.set(post);
    })

    return {
        loading: !handle.ready(),
        post: pd.get(),
        ...props    
    };
})(PostView);
