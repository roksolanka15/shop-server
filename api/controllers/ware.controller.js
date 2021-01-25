var mongoose = require('mongoose');
var Ware = mongoose.model('Ware');

exports.create = (req, res) => {
  let ware = new Ware(req.body);
  ware.save((err, item) => {
    if( err ) {
      res.status(422).json(err).end()
    }
    res.json(item)
  })
}
exports.show = (req, res) =>{
  let vendor = req.params.vendor
  Ware.findOne({vendor: vendor}, (err, item) => {
    if( err ) {
      res.status(500).json(err).end()
    }
    res.json(item)
  })
}
exports.list = (req, res) => {
  Ware.find({}, (err, items) => {
    if( err ) {
      res.status(500).json(err).end()
    }
    res.json(items)
  })
}
exports.update = (req, res) => {
  let id = req.params.id;
  Ware.findOneAndUpdate({_id : id}, req.body, (err, item) => {
    if( err ) {
      res.status(422).json(err).end()
    }
    res.json(item)
  })
}
exports.remove = (req, res) => {
  let id = req.params.id;
  Ware.findByIdAndRemove(id, (err, result) => {
    if (err) {
      res.status(500).json(err).end()
    }
    res.json(result)
  })
}
