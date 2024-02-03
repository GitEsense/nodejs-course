import operations from "../operations/index.mjs";
import EventEmitter from "events";

const myEmitter = new EventEmitter();
myEmitter.on("result", (res) => console.log(res));

Object.entries(operations).map(([key, operation]) => {
  myEmitter.on(key, (a, b) => {
    myEmitter.emit("result", operation(a, b));
  });
});
myEmitter.emit("add", 55, 6);
myEmitter.emit("division", 55, 6);
myEmitter.emit("multiple", 55, 6);
