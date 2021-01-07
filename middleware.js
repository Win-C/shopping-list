"use strict";

/**  Middleware. */

const { NotFoundError } = require("./expressError");
const { dbItems } = require("./fakeDb");

/** Function checks if url parameter name is valid and throws error if not.*/  

function itemExists(req, res, next) {
  const itemName = req.params.name;
  const idxFound = dbItems.findIndex(i => i.name === itemName);

  if (idxFound === -1) throw new NotFoundError(); 

  return next();
}

module.exports = { itemExists };