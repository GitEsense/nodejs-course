function createLabel(number, index) {
  const labels = [
    ["год", "года", "лет"],
    ["месяц", "месяца", "месяцев"],
    ["день", "дня", "дней"],
    ["час", "часа", "часов"],
    ["минута", "минуты", "минут"],
    ["секунда", "секунды", "секунд"],
  ];

  const patternMap = new Map([
    ["one", 0],
    ["few", 1],
    ["many", 2],
  ]);
  const plural = new Intl.PluralRules("ru-RU", { type: "cardinal" }).select(
    number
  );
  const subIndex = patternMap.get(plural);

  return labels[index][subIndex];
}

export default function getDayBetweenDates(ms) {
  const second = Math.floor(ms / 1000),
    minute = Math.floor(second / 60),
    hour = Math.floor(minute / 60),
    day = Math.floor(hour / 24),
    month = Math.floor(day / 30.425),
    year = Math.floor(month / 12);

  const unitMap = new Map([
    ["year", year],
    ["month", month % 12],
    ["day", Math.floor(day % 30.425)],
    ["hour", hour % 24],
    ["minute", minute % 60],
    ["second", second % 60],
  ]);
  const templateMessage = [];
  [...unitMap].map(([, number], index) => {
    if (number !== 0)
      templateMessage.push(`${number} ${createLabel(number, index)}`);
  });
  return templateMessage.join(", ");
}
