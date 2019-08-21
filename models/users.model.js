const mongoose =require( "../config/database");
const Schema = mongoose.Schema;

var users = {
    user_name: { 
	type:String, 
	unique:true, 
	required:true, 
	}, 	
	user_email: { 
	type:String, 
	unique:false, 
	required:false, 
	}
}

var usersSchema = new Schema(users);
module.exports = mongoose.model('User', usersSchema);