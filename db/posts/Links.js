import Posts from './collection.js';
import Comments from '/db/comments/collection.js';
import Users from '/db/users/collection.js';
Posts.addLinks({
    'author': {
        type: 'one',
        collection: Users,
        field: 'userId',
    },
    'cmt': {
        collection: Comments,
        inversedBy: 'clt',
        autoremove:true,
    },
});
