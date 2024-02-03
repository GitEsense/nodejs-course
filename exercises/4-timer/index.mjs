import boom from "./caboom.mjs";

const timeString = process.argv.at(-1);

const template = {
  h: 1000 * 60 * 60,
  m: 1000 * 60,
  s: 1000,
};

function handleTimeString(str) {
  const values = str.split(" ");
  return values.reduce((total, item) => {
    const num = Number.parseInt(item);
    const char = item.slice(-1);
    const ms = template[char];
    total += num * ms;
    return total;
  }, 0);
}

function main() {
  const time = handleTimeString(timeString);
  boom(time, () => console.log("Boom!"));
}

main();
