const mongoose =require( "../config/database");
const Schema = mongoose.Schema;

var restaurants = {
    rest_name: { 
		type:String, 
		unique:true, 
		required:true
	}, 	
	rest_description: { 
		type:String, 
		unique:false, 
		required:false
	}, 	
	rest_address: { 
		type:String, 
		unique:false, 
		required:false
	}, 	
	rest_phone: { 
		type:String, 
		unique:false, 
		required:false 
	}, 	
	rest_category: { 
		type:String, 
		unique:false, 
		required:false 
	}, 	
	rest_quality: { 
		type:Number, 
		unique:false, 
		required:false
	}, 	
	rest_image1: { 
		type:String, 
		unique:false, 
		required:false 
	}, 	
	rest_image2: { 
		type:String, 
		unique:false, 
		required:false 
	}, 	
	rest_workinghours: { 
		type:String, 
		unique:false, 
		required:false 
	}
	, 	
	rest_comments:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment'
        }
    ]
}

var restaurantsSchema = new Schema(restaurants);


restaurantsSchema.methods.saveComment =  async function(commentId) {
    this.rest_comments.push(commentId);
    let restaurant= await this.save();
    return restaurant;
}

restaurantsSchema.methods.deleteComment =  async function(commentId) {
    this.rest_comments.pull(commentId);
    let restaurant= await this.save();
    return restaurant;
}

module.exports = mongoose.model('Restaurant', restaurantsSchema);