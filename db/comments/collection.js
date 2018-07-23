import {Mongo} from "meteor/mongo";
import CommentSchema from './schema';

const Comments = new Mongo.Collection('comments');//create a new collection for comments

Comments.attachSchema(CommentSchema);

export default Comments;//exports Comments for subscription

