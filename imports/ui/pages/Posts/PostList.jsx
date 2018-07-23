import React from 'react';
import {Meteor} from 'meteor/meteor'
import { browserHistory } from 'react-router';
import Security from '/imports/api/security';
import PostListCount from './PostListCount';
export default class PostList extends React.Component {
        constructor() {
        super();
        this.state = {posts: null};
        this.state = {noofcomments: 0};
        }
        componentDidMount() {
        Meteor.call('secured.post_list', (err, posts) => {this.setState({posts});});

        }
    DeletePost(postId){
    Meteor.call('secured.deletepost', postId,(err)=>{
    if(err) {alert(err.reason);}
    else { Meteor.call('secured.post_list',(err,posts)=>{
            this.setState({posts}); })
            }  
        });
    }

    render() {
        const {posts,noofcomments} = this.state;
        const {history} = this.props;
        if (!posts) { return <div>Loading....</div>}
        return (
            <div className="post">
            {
              posts.map((post) => {
              return(
                <div key={post._id}>
                  <p >Post title: {post.title}, Post Description: {post.description}</p>
                  <p >Post type: {post.type}, Views: {post.views} </p>

                  <PostListCount val={post._id} />
                  {(Meteor.userId()===post.userId)?(<button onClick={() => {history.push("/posts/edit/" + post._id)}}> Edit post</button>):""
                  }
                  <button onClick={() => {history.push("/posts/view/" + post._id)}}> View post</button>

                  {(Meteor.userId()===post.userId)?(<button onClick={() => { if (window.confirm('Are you sure to delete this post?'))  this.DeletePost(post._id);}}>Delete Post</button>):""
                  }
                  </div>
                )
                })
            }
                <button onClick={() => history.push('/posts/create')}>Create a new post</button>
            </div>
        )
    }
}

