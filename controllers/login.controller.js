var loginModel = require("../models/users.model");

class LoginController {
    constructor(isApi) {
        this.isApi = isApi;
        this.get = this.get.bind(this);
        this.login = this.login.bind(this);
        this.show = this.show.bind(this);
        this.insert = this.insert.bind(this);
    }

    get isApi() {
        return this._isApi;
    }

    set isApi(value) {
        this._isApi = value;
    }

    get(req, res) {
        if (this.isApi)
            res.send();
        else
            res.render('login', {layout: false});
    }

    async login(name,password) {

        let user_model=loginModel.findOne({user_name: name, user_password: password});
        return user_model;
    }

    show(req, res) {
        if (this.isApi)
            res.send();
        else
            res.render('formcreateuser', {layout: false});
    }

    async insert(dataToSave) {
        var data = await loginModel.create(dataToSave);
        return data;
    }
}

module.exports = LoginController;
