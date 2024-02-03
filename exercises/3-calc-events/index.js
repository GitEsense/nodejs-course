const myEmitter = new myEmitter();

const { add } = require("../3-calc/add.js");
const { multiple } = require("../3-calc/multiple.js");
const { division } = require("../3-calc/division.js");
const { substraction } = require("../3-calc/substraction.js");

const actions = {
  add: add,
  multiple: multiple,
  division: division,
  substraction: substraction,
};

Object.entries(actions).map(([key, action]) => {
  myEmitter.on(key, (a, b) => {
    myEmitter.emit("result", action(a, b));
  });
});
myEmitter.emit("add", 5, 6);
myEmitter.on("result", (res) => console.log(res));
