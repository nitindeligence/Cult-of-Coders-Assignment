import React from 'react';
import {AutoForm, AutoField, ErrorsField} from 'uniforms-unstyled';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
export default class Login extends React.Component {
    constructor() {
        super();
    }

    UNSAFE_componentWillMount() {
        if(Meteor.userId()){
            this.props.history.push('/posts');
        }
    }

    handleLogin = (data) => {
        const {email, password} = data;
        Meteor.loginWithPassword(email, password, (err) => {
            if (!err) {
                return this.props.history.push('/posts');
            }
            alert(err.reason);
        });
    };

    render() {
        return (
            <div className="authentication">
                <AutoForm onSubmit={this.handleLogin} schema={LoginSchema}>
                    <ErrorsField/>
                    <AutoField name="email"placeholder="Email"/>
                    <AutoField name="password" type="password" placeholder="Password"/>
                    <button type="submit">Login</button>
                </AutoForm>
            </div>
        )
    }
}

Login.propTypes = {
    history: PropTypes.object,
};

const LoginSchema = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {type: String}
});
