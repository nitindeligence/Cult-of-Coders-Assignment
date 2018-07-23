import { Meteor } from 'meteor/meteor';
import UserSchema from './schema';
const Users = Meteor.users;//users table already created. Assign Users  the userslist

Users.attachSchema(UserSchema);

export default Users;