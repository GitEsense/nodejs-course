import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
    console.log(dedent`${chalk.bgRed('ERROR')} ${error}`);
};

const printSuccess = (success) => {
    console.log(dedent`${chalk.bgGreen('SUCCESS')} ${success}`);
};

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan('HELP')}
        Без параметров - вывод погоды
        -h для вывода помощи
        -d для удаления файла конфигурации
        -s [CITY] для установки города
        -l [LANG] для установки языка
        -t [API_KEY] для сохранения токена
        -i Получить информацию о конфигурации`,
    );
};

const printWeather = (res, lang, icon) => {
    const { name, main, wind, dt, weather } = res;
    const isLanguageRU = lang === 'ru';
    console.log(
        chalk.bold(dedent`${chalk.bgYellow('WEAHTER')}
    ${new Date(dt * 1000).toLocaleString()}
    ${isLanguageRU ? 'Погода в городе' : 'Weather in the city'} ${name}
    ${icon}  ${weather[0].description}
    ${isLanguageRU ? 'Температура' : 'Temperature'}: ${main.temp} (${isLanguageRU ? 'ощущается как' : 'feels like'} ${main.feels_like})
    ${isLanguageRU ? 'Влажность' : 'Humidity'}: ${main.humidity}
    ${isLanguageRU ? 'Скорость ветра' : 'Wind speed'}: ${wind.speed}`),
    );
};

export { printError, printSuccess, printHelp, printWeather };
