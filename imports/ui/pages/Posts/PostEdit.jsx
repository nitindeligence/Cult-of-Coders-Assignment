import React from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {AutoForm, AutoField, LongTextField, SelectField, ErrorsField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import { PostTagsLabels } from '/db/posts/enums/tags';

export default class PostEdit extends React.Component {
    constructor() {
        super();
        this.state = {post: null};
        this.bacttoPostList.bind(this);
        this.redirecttoLogout.bind(this);
    }

    componentDidMount() {
        if (!Meteor.userId()) {this.props.history.push('/login');
        }else {
            Meteor.call('secured.post_get', this.props.match.params._id, (err, post) => {
                this.setState({post});
            });
        }
    }

    bacttoPostList = () => {
        if(this.props.history)
            this.props.history.push('/posts');
    }

    redirecttoLogout = () => {
        if(this.props.history)
            Meteor.logout(() => this.props.history.push('/login'));
    }

    submit = (postDetails) => {
        //console.log(postDetails);
        Meteor.call('secured.post_edit', this.props.match.params._id, postDetails, (err) => {
        //calls post.edit method from api/posts/methods.js for updating post details against given id
            if (err) {
                return alert(err.reason);
                //alerts with reason why post was not edited if there is an error
            }
            else{
                this.props.history.push('/posts');
            //redirects the page to post list if post updation is successfull
            }
        });
    };

    render() {
        const {post} = this.state;
        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="postDetails">
                <AutoForm onSubmit={this.submit} schema={PostSchema} model={post}>
                    <ErrorsField/>
                    <AutoField name="title" />
                    <LongTextField name="description"/>
                    <SelectField name="type" options={PostTagsLabels}/>
                    <button type='submit'>Edit post</button>
                </AutoForm>
                <button onClick={ this.bacttoPostList }>Back to posts</button>
                {Meteor.user() ?
                    (<div><button onClick={ this.redirecttoLogout }>Logout</button>
                    </div>)
                    : ''}
            </div>
        )
    }
}

PostEdit.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    params: PropTypes.func,
    _id: PropTypes.string,
};