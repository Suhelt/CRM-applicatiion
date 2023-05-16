const userController = require("../controllers/user.controller");
const verifyUserReqBody = require("../middlewares");
const authJwt = require("../middlewares");


module.exports = function(app){
    app.get("crm/api/v1/users",[authJwt.verifyToken,authJwt.isAdmin],userController.findAll);
    app.get("crm/api/v1/users/:userId",[authJwt.verifyToken,authJwt.isAdmin],userController.findById)
}