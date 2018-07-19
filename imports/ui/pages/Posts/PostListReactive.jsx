import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';PostListReactive.jsx
import {Posts} from '/db';


class PostListReactive extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {posts, history} = this.props;

        if (!posts) {PostListReactive.jsx
            return <div>Loading....</div>
        }
PostListReactive.jsx
        return (
            <div className="post">
                {PostListReactive.jsx
                    posts.map((post) => {
                        return (
                            <div key={post._id}>
                                <p>Post id: {post._id} </p>
                                <p>Post title: {post.title}, Post Description: {post.description} </p>
                                <button onClick={() => {
                                    history.push("/posts/edit/" + post._id)
                                }}> Edit post
                                </button>
                            </div>
                        )
                    })}
                <button onClick={() => history.push('/posts/create')}>Create a new post</button>
            </div>
        )
    }
}


export default withTracker(props => {
    const handle = Meteor.subscribe('posts');

    return {
        loading: !handle.ready(),
        posts: Posts.find().fetch(),
        ...props
    };
})(PostListReactive);
