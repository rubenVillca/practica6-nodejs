var commentModel = require("../models/comments.model");
var restaurantModel = require("../models/restaurants.model");
class CommentController {
    constructor() {

    }
    
    async getAll() {
        var data = await commentModel.find().populate('comm_user');
        return data;      
    }

    async getOne (id) {
        
        var data = await commentModel.findOne({_id:id});
        return data;        
    }
	
	async getOnePopulate (id) {
        
        var data = await commentModel.findOne({_id:id}).populate('comm_user');
        return data;        
    }

    async insert  (dataToSave) {
        
        var data = await commentModel.create(dataToSave);
        if (data.comm_restaurant) {
            let restaurant = await restaurantModel.findOne(data.comm_restaurant);
            restaurant = await restaurant.saveComment(data.id);
        }
        return data;
        
    }

    async edit (id, dataToUpdate) {
        
        var data = await commentModel.updateOne({_id:id}, dataToUpdate); 
        return data;
        
     }

    async delete (id) {       
        var data = await commentModel.deleteOne({_id:id}); 
        return data;        
     }
}
module.exports = CommentController;
