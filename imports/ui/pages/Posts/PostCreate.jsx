import React from 'react';
import {AutoForm, AutoField, LongTextField,SelectField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';

export default class PostCreate extends React.Component {
    constructor() {
        super();
    }

    submit = (post) => {
        Meteor.call('post.create', post, (err) => {
         //calls post.edit method from api/posts/methods.js for updating post details against given id
            if (err) {
                return alert(err.reason);
            }
            else{ 
            this.props.history.push('/posts');
            //redirects the page to post list if post insertion is successfull
            }
        });
    };

    render() {
        const {history} = this.props;
        const typeArray = [{ label: "Select Type", value: " " },{ label: "Nature", value: "Nature" }, { label: "Psychology", value: "Psychology" },{label : 'Music',value:'Music'},{label: 'Programming' , value : 'Programming'},{label: 'Project Management' , value : 'Project Management'},{label: 'Other' , value : 'Other'}];
        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema}>
               <AutoField name="title" className="form-control"/>
               <LongTextField name="description" className="form-control" />             
                <SelectField name="type" options={typeArray} />
                    <button type='submit'>Add post</button>
                    <button onClick={() => history.push('/posts')}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
