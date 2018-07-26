import Posts from './collection.js';
import Comments from '/db/comments/collection.js';
import Users from '/db/users/collection.js';
Posts.addLinks({
    'author': {
        type: 'one',
        collection: Meteor.users,
        field: 'userId',
    },
    'cmt': {
        collection: Comments,
        inversedBy: 'clt',
        autoremove:true,
    },
});
