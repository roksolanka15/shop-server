var controller = require("../controllers/user.controller");

module.exports = function(app){

  app.get('/sign_up', controller.sign_up_form)

  app.get('/user', controller.loginRequired, controller.room)

  app.get('/list', controller.loginRequired, controller.checkPermissionsCustomer, controller.list)

  app.delete('/list', controller.remove_all)

  app.get('/sign_in', controller.render_sign_in_form)

  app.post('/sign_in', controller.login)

  app.post('/sign_up', controller.create)
}
