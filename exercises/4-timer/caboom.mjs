import timeFormatter from "./time-formatter.mjs";

export default function boomTime(time, callback) {
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
