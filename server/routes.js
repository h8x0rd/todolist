/**
 * Main application routes
 */

'use strict';

const errors = require('./components/errors');
const path = require('path');
const express = require('express');

module.exports = function(app) {
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
  });
  // Insert routes below
  app.use('/api/todos', require('./api/todo'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  const absolutePath = path.join(__dirname, '../dist');
  console.log("PATH ::" + absolutePath);

  app.use(express.static(absolutePath));
  app.get('*', function(req, res) {
    res.sendFile(absolutePath);
    //__dirname : It will resolve to your project folder.
  });
};
