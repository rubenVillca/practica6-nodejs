var restaurantModel = require("../models/restaurants.model");
class RestaurantController {
    constructor() {

    }
    
    async getAll() {
        var data = await restaurantModel.find();
        return data;      
    }
	
	async getAllByCategory(category) {
		var data = await restaurantModel.find({rest_category:category});
        return data; 
		
	}

    async getOne (id) {
        
        var data = await restaurantModel.findOne({_id:id}).populate({
            path : 'rest_comments',
            populate : {
              path : 'comm_user'
            }
          });
        return data;        
    }

    async insert  (dataToSave) {
        
        var data = await restaurantModel.create(dataToSave);
        return data;
        
    }

    async edit (id, dataToUpdate) {
        
        var data = await restaurantModel.updateOne({_id:id}, dataToUpdate); 
        return data;
        
     }

    async delete (id) {       
        var data = await restaurantModel.deleteOne({_id:id}); 
        return data;        
     }
}
module.exports = RestaurantController;
