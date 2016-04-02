;(function () {
  'use strict'
  var express = require('express')
  var router = express.Router()
  var Model = require('./data.schema.js')

  router.get('/', function (req, res, next) {
    Model.find({}).exec(function (err, results) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(results)
      }
    })
  })

  router.post('/', function (req, res, next) {
    var obj = new Model(req.body)
    obj.save(function (err, obj) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(obj)
      }
    })
  })
  router.delete('/api/data/:id', function (req, res) {
    Model.findById(req.params.id, function (err, Model) {
      Model.remove(function (err) {
        if (!err) {
          console.log('removed')
          return res.send('')
        } else {
          console.log(err)
        }
      })
    })
  })
  module.exports = router
})()
