import timeFormatter from "./time-formatter.mjs";

export default function boomTime(time, callback) {
  if (!time) {
    return console.log(`Неверно заданы параметр запуска, используйте формат 
    h - hour
    m - minute
    s - second
    Пример: "22h 10m 33s"
    `);
  }
  console.log(`Запускаем обратный отсчёт!`);
  console.log(`До взрыва осталось: ${timeFormatter(Math.floor(time))}`);
  const interval = setInterval(() => {
    console.log(
      `До взрыва осталось: ${timeFormatter(Math.floor((time -= 1000)))}`
    );
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    callback();
  }, time - 50);
}
