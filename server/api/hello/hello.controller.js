'use strict';

const _ = require('lodash');

// Get list of todos
exports.index = function(req, res) {
  let resp = process.env.MESSAGE ? process.env.MESSAGE : 'hello world'
  return res.status(200).json({"message": resp});
};

// Get a single todo
exports.show = function(req, res) {
  return res.status(200).json({"message": `goodbye ${req.params.id} 👋`});
};


function handleError(res, err) {
  return res.status(500).send(err);
}

function handleObjectId(req, res) {
  // check if it is a valid ObjectID to prevent cast error
  if (!req.params || !req.params.id || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).send('not a valid mongo object id');
    return false;
  }
  return true;
}
