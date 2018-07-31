import {Mongo} from 'meteor/mongo';
import PostSchema from './schema';

const Posts = new Mongo.Collection('posts');//create new collection for posts

Posts.attachSchema(PostSchema);

export default Posts;//exports posts for subscription