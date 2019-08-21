const mongoose =require( "../config/database");
const Schema = mongoose.Schema;

var comments = {
    comm_comment: { 
	type:String, 
	unique:false, 
	required:true, 
	}, 	
	comm_user: {
        type: Schema.ObjectId,
        ref: 'User'
    }, 	
	comm_date: { 
	type:Date, 
	unique:false, 
	required:false, 
	},
	comm_restaurant: {
        type: Schema.ObjectId,
        ref: 'Restaurant'
    }
}

var commentsSchema = new Schema(comments);
module.exports = mongoose.model('Comment', commentsSchema);