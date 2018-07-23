import React from 'react';
import {AutoForm, AutoField, LongTextField,SelectField,ErrorsField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';

export default class PostCreate extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
    if (!Meteor.userId()) {this.props.history.push('/login');}
    }
    
    submit = (post) => {
        Meteor.call('secured.post_create', post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            else{ 
            this.props.history.push('/posts');
            }
        });
    };

    render() {
        const {history} = this.props;
        const typeArray = [{ label: "Select Type", value: " " },{ label: "Nature", value: "Nature" }, { label: "Psychology", value: "Psychology" },{label : 'Music',value:'Music'},{label: 'Programming' , value : 'Programming'},{label: 'Project Management' , value : 'Project Management'},{label: 'Other' , value : 'Other'}];
        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema}>
                <ErrorsField/>
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
