import React from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
//import { Route, Redirect } from 'react-router';
import PostEditBtn  from './PostEditBtn';
import PostDeleteBtn  from './PostDeleteBtn';
import PostViewBtn  from './PostViewBtn';

export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = {posts: null};
        this.postView.bind(this);
        this.redirectCreate.bind(this);
        this.setStateChange.bind(this);
        this.redirectLogout.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount() {
        Meteor.call('secured.post_list', (err, posts) => {this.setState({posts});});
    }

    postView=(postId)=>{
        if(this.props.history)
            this.props.history.push('/posts/view/' + postId);
    }

    deletePost(postId){
        if (window.confirm('Are you sure you wish to delete this post? Deleting this post will delete all the comments against this post')){
            Meteor.call('secured.deletepost',postId,(err)=> {
                if(err){
                    return alert(err.reason);
                }else
                {
                    this.setStateChange();
                }
            });
        }
    }

    setStateChange(){
        Meteor.call('secured.post_list', (err, posts) => {
            this.setState({posts});
        });
    }

    redirectCreate=()=>{
        if(this.props.history)
            this.props.history.push('/posts/create');
    }

    editPost= (id) => {
       
        if(id)
        {
            if(this.props.history)
                this.props.history.push('/posts/edit/'+id);
        }
    }

    redirectLogout = () => {
        if(this.props.history)
            Meteor.logout(() => this.props.history.push('/login'));
    }
    
    render() {
        const {posts} = this.state;
        if (!posts) { return <div>Loading....</div>}
        return (
            <div className="post">
                {
                    posts.map((post) => {
                        return(
                            <div key={post._id}>
                                <p >Post title: {post.title}, Post Description: {post.description}</p>
                                <p >Post type: {post.type}, Views: {post.views} </p>
                                <p >Comments: {post.cmt ? post.cmt.length : 0}</p>
                                {(Meteor.userId()===post.author._id) ?
                                    (<div>
                                        <PostEditBtn
                                            key={post._id}
                                            postId = {post._id}
                                            onClickEditPost={this.editPost}
                                        />
                                    </div>)
                                    : ''
                                }
                                <PostViewBtn
                                    key={post._id}
                                    postId = {post._id}
                                    onClickViewPost={this.postView }

                                />
                                {(Meteor.userId()===post.author._id) ?
                                    (<div>
                                        <PostDeleteBtn
                                            key={post._id}
                                            postId = {post._id}
                                            onClickdeletePost={this.deletePost}
                                        />
                                    </div>)
                                    : ''
                                }
                            </div>
                        )}
                    )}
                {Meteor.user() ?
                    (<div>
                        <button onClick={ this.redirectCreate }>Create a new post</button>
                        <button onClick={ this.redirectLogout }>Logout</button>
                    </div>)
                    : ''}
            </div>
        )
    }
}

PostList.propTypes = {
    history: PropTypes.object,
};