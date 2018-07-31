import _ from 'underscore';
import SimplSchema from 'simpl-schema';
import PostTagsEnum from './enums/tags';

export default new SimplSchema({
    title: String,
    description: String,
    type: {
        type: String,
        allowedValues : _.values(PostTagsEnum),
    },

    'type.$': {
        type: String,
        allowedValues : _.values(PostTagsEnum),
    },
    views: {
        type:Number,
        defaultValue:0
    },
    createdAt: {
        type:Date,
        defaultValue:new Date()
    },
    userId: {
        type: String,
        optional: true,
    }
});