import React from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {AutoForm, AutoField, LongTextField,SelectField,ErrorsField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import { PostTagsLabels } from '/db/posts/enums/tags';
export default class PostCreate extends React.Component {
    constructor() {
        super();
        this.redirecttoLogout.bind(this);
        this.bacttoPostList.bind(this);
    }
    componentDidMount() {
        if (!Meteor.userId()) {this.props.history.push('/login');}
    }
    
    redirecttoLogout = () => {
        if(this.props.history)
            Meteor.logout(() => this.props.history.push('/login'));
    }

    bacttoPostList = () => {
        if(this.props.history)
            this.props.history.push('/posts');
    }

    submit = (post) => {
        Meteor.call('secured.post_create', post, (err) => {
            if (err) {
                return alert(err.reason);
            }else{
                this.props.history.push('/posts');
            }
        });
    };

    render() {
        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema}>
                    <ErrorsField/>
                    <AutoField name="title" className="form-control"/>
                    <LongTextField name="description" className="form-control" />
                    <SelectField name="type" options={PostTagsLabels} />
                    <button type='submit'>Add post</button>
                    <button onClick={ this.bacttoPostList }>Back to posts</button>
                </AutoForm>
                <button onClick={ this.redirecttoLogout }>Logout</button>
            </div>
        )
    }
}

PostCreate.propTypes = {
    history: PropTypes.object,
};