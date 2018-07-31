import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    comment: String,
    postId: {
        type:String,
        optional: true,
    },
    userId: {
        type: String,
        optional: true,
    },
    useremail :
    {
        type : String,
        optional : true,
    },
});

