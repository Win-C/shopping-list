"use strict";

const request = require("supertest");

const app = require("./app.js");
const { dbItems } = require("./fakeDb.js");
// const { itemExists } = require("./middleware");

beforeEach(function () {
  dbItems.push({
    name: "popsicle",
    price: 1.45,
  });
});

afterEach(function () {
  // NOTE: we were re-assigned dbItems
  // dbItems = [];
  dbItems.length = 0;
})

/** Get /items returns {items: [item...]} */ 

describe("GET /items", function () {
  it("Gets current list of shopping items", async function () {
    const resp = await request(app).get('/items');

    expect(resp.body).toEqual({ items: [{ name: "popsicle", price: 1.45 }] });
  });
});

/** POST /items adds item to db and returns { added: newItem } */

describe("POST /items", function () {
  it("Adds an item", async function () {
    debugger;
    const resp = await request(app)
      .post('/items')
      .send({
        name: "ice",
        price: 1,
      });

    expect(resp.body).toEqual({ added: { name: "ice", price: 1 } });
    console.log('dbItems=',dbItems);
    // QUESTION: why doesn't our dbItems update?
    expect(dbItems).toEqual([
      { name: "popsicle", price: 1.45 },
      { name: "ice", price: 1 }
    ]);
    expect(resp.statusCode).toEqual(201);
  });
});