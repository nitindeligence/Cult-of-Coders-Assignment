import React from 'react';
import {AutoForm, AutoField, LongTextField, SelectField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';

export default class PostView extends React.Component {
    constructor() {
        super();
        this.state = {post: null};
    }

    componentDidMount() {
        Meteor.call('post.getwithview', this.props.match.params._id, (err, post) => {
            this.setState({post});
        });
    }
    render() {
        const {history} = this.props;
        const {post} = this.state;
        if (!post) {
            return <div>Loading....</div>
        }

        return (
                <div className="container nitin">
                <div className="row"><h1>Title:{post.title}</h1></div>
                <div className="row">Description:{post.description}</div>
                <div className="row">Type:{post.type}</div>
                <div className="row">Views:{post.views}</div>
                <div className="row"><button className="btn btn-primary pull-left" onClick={() => history.push('/posts/create')}>Create post</button>
                <button className="btn btn-primary pull-right" onClick={() => history.push('/posts')}>List All post</button></div>
                </div>
                
        )
    }
}
