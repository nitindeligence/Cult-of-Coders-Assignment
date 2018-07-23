import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    title: String,
    description: String,
    type:String,
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
        optional: true 
    }
});