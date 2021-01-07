/** Routes for shopping list Express app. */

const express = require("express");

const { dbItems } = require("./fakeDb");
const router = new express.Router();

// useful error class to throw
const { NotFoundError } = require("./expressError");

/** GET /items: get list of items */
router.get("/", function (req, res, next) {
  return res.json({ items: dbItems });
});

/** POST /items: add item, return item added */
router.post("/", function (req, res, next) {
  const newItem = {
    name: req.body.name,
    price: req.body.price,
  };
  dbItems.push(newItem);
  return res.json({ added: newItem });
});

/** GET /items/:name: get single item and return it */
router.get("/:name", function (req, res, next) {
  const itemName = req.params.name;
  const itemFound = dbItems.find(i => i.name === itemName);

  if (!itemFound) throw new NotFoundError(); 

  return res.json(itemFound);
});

/** PATCH /items/:name: modity item, return item modified */
router.patch("/:name", function (req, res, next) {
  // TODO: add in middleware for URL param check, see route above for repeat
  const itemName = req.params.name;
  const idxFound = dbItems.findIndex(i => i.name === itemName);

  if (idxFound === -1) throw new NotFoundError(); 

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
router.delete("/:name", function (req, res, next) {
  const itemName = req.params.name;
  const idxFound = dbItems.findIndex(i => i.name === itemName);

  if (idxFound === -1) throw new NotFoundError(); 

  dbItems.splice(idxFound,1);
  return res.json({ message: "Deleted" });
});

module.exports = router;
