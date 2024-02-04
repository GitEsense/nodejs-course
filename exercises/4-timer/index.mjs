import boom from "./caboom.mjs";

const template = {
  h: 1000 * 60 * 60,
  m: 1000 * 60,
  s: 1000,
};
const errorMessage =
  new Error(`Неверно заданы параметр запуска, используйте формат 
    h - hour
    m - minute
    s - second
    Пример: "22h 10m 33s"
    `);

function handleTimeString(str = "") {
  const values = str.split(" ");
  return values.reduce((total, item) => {
    const num = parseInt(item);
    const char = item.slice(-1);
    const ms = template[char];
    total += num * ms;
    return total;
  }, 0);
}

function main() {
  try {
    const timeString = process.argv[2];
    const time = handleTimeString(timeString);
    if (!time) {
      throw errorMessage;
    }
    boom(time, () => console.log("Boom!"));
  } catch (e) {
    console.error(e.message);
  }
}

main();
