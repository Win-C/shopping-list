"use strict";
/** Routes for shopping list Express app. */

const express = require("express");

const { dbItems } = require("./fakeDb.js");
const router = new express.Router();

const middleware = require("./middleware.js")

/** GET /items: get list of items */
router.get("/", function (req, res, next) {
  return res.json({ items: dbItems });
});

/** POST /items: add item, return item added */
router.post("/", function (req, res, next) {
  const {name, price} = req.body;
  // const newItem = {
  //   name: req.body.name,
  //   price: req.body.price,
  // };
  dbItems.push({name, price});
  return res
  .status(201)
  .json({ added: {name, price} });
});

/** GET /items/:name: get single item and return it */
router.get("/:name", middleware.itemExists, function (req, res, next) {
  const itemName = req.params.name;
  const itemFound = dbItems.find(i => i.name === itemName);

  return res.json(itemFound);
});

/** PATCH /items/:name: modify item, return item modified */
router.patch("/:name", middleware.itemExists, function (req, res, next) {
  const itemName = req.params.name;
  const idxFound = dbItems.findIndex(i => i.name === itemName);

  // Updated items database
  if (req.body.name) dbItems[idxFound]["name"] = req.body.name;
  if (req.body.price) dbItems[idxFound]["price"] = req.body.price;

  // Note: alternate path evaluated
  // for (let item in req.body){
  //   itemFound[item] = req.body[item];
  // }

  return res.json({ updated: dbItems[idxFound] });
});

/** DELETE /items/:name: delete item, return {message: Deleted} */
router.delete("/:name", middleware.itemExists, function (req, res, next) {
  const itemName = req.params.name;
  const idxFound = dbItems.findIndex(i => i.name === itemName);

  dbItems.splice(idxFound,1);
  return res.json({ message: "Deleted" });
});

module.exports = router;
