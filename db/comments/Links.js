import Comments from './collection.js';
import Users from '/db/users/collection.js';
import Posts from '/db/posts/collection.js';

Comments.addLinks({
    'user': {
        type: 'one',
        collection: Users,
        field: 'userId',
    },
    'clt': {
        type: 'one',
        collection: Posts,
        field: 'postId',
        //index: true
    },
});