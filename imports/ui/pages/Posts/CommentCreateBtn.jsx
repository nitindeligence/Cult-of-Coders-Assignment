import React from 'react';
import {AutoForm, LongTextField, ErrorsField} from 'uniforms-unstyled';
import CommentSchema from '/db/comments/schema';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
export default class CommentCreateBtn extends React.Component {

    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.handleSubmit.bind(this);
    }

    handleSubmit = (comment) => {
        Meteor.call('secured.comment_insert',comment,this.props.postId,  (err) => {
            if (err) {
                return alert(err.reason);
            }
            this.formRef.current.reset();
        });
    };
   
    render()
    {
        return (
            <div className="comment">
                {
                    Meteor.user() ?
                        <AutoForm  onSubmit={this.handleSubmit}  ref={this.formRef}  schema={CommentSchema}>
                            <ErrorsField/>
                            <LongTextField name="comment"/>
                            <button type='submit'>Add Comment</button>
                        </AutoForm>  : ''
                }
            </div>
        )
    }
}

CommentCreateBtn.propTypes = {
    postId: PropTypes.string,
};