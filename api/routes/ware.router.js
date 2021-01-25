const controller = require('../controllers/ware.controller');

module.exports = function(app){
  app.post('/wares', controller.create)

  app.get('/wares/:vendor', controller.show)

  app.get('/wares', controller.list)

  app.put('/wares/:id', controller.update)
  app.delete('/wares/:id', controller.remove)
}
