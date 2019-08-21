var userModel = require("../models/users.model");
class UserController {
    constructor(isApi) {
        this.isApi = isApi;
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.insert = this.insert.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.displayUpdateForm = this.displayUpdateForm.bind(this);
        this.displayCreateForm = this.displayCreateForm.bind(this);

    }

    get isApi() {
        return this._isApi;
      }
    
    set isApi(value) {
        this._isApi = value;
    }
    
    getAll(req, res) {
       userModel.find({}, (err, data) => {
            if (err) req.flash('info', 'Sorry!');
            if(this.isApi)
                res.send(data)                
            else
                res.render('users', { data: data })
               
       });      
    }

    async getAllWithAsync(req, res) {
        var data = await userModel.find();
        return data;       
     }

    getOne (req, res) {
        let id = req.params.id
        userModel.findOne({_id:id}, (err, data) => {
            if (err) req.flash('info', 'Sorry!');
            if(this.isApi)
                res.send(data)
            else
                res.render('user', { data: data })
        });       
    }

    insert  (req, res) {
        let dataToSave = req.body;
        userModel.create(dataToSave, (err, data) => {
            if (err) 
                res.render('fail', { message: "Error Encontrado" })
            else
                if(this.isApi)
                    res.send(data)
                else 
                    res.render('success', { message: "Se Añadio con exito" })
        })
        
    }

    edit (req, res) {
        let id = req.params.id;
        let dataToUpdate = req.body;
        userModel.updateOne({_id:id}, dataToUpdate,  (err, data) => {
            if (err) 
                res.render('fail', { message: "Error Encontrado" })
            else
                if(this.isApi)
                    res.send(data)
                else
                    res.render('success', { message: "Se Actualizo con exito" })
                    
        }); 
        
     }

     delete (req, res) {
        let id = req.params.id;
        userModel.deleteOne({_id:id}, (err, data) => {
            if (err) 
                res.render('fail', { message: "Error Encontrado" })
            else
                if(this.isApi)
                    res.send(data)                    
                else
                    res.render('success', { message: "Se Elimino con exito" })
                    
        }); 
        
     }

     displayUpdateForm(req, res) {
        let id = req.params.id
        userModel.findOne({_id:id}, (err, data) => {
            if (err) req.flash('info', 'Sorry! We are not able to log you in!');
            res.render('formupdate', { data: data })
        }); 
        
     }

     displayCreateForm(req, res) {
        res.render('formcreate', { })
        
     }
}
module.exports = UserController;
