'use strict';

const axios = require('axios');
const { parse } = require('html-table-to-json');

const SITE_URL = 'https://arizona-rp.com/mon/fraction/';

/**
 * Получение информации о фракции (весь список игроков, их ранги, статус)
 * @param {number} server Порядковый номер сервера
 * @param {number} fractionID ID фракции, как указано на самом сервере
 * @param {Object} requestConfig Конфиг для запроса axios
 */
module.exports = async (server, fractionID, requestConfig = {}) => {
  // Проверяем валидность указанных аргументов
  const validArgs = server && fractionID;
  const validTypes = typeof server === 'number' && typeof fractionID === 'number';
  if (!validArgs || !validTypes) {
    throw new TypeError('Сервер или фракция указаны неверно');
  }

  // Запрашиваем HTML с сайта Аризоны
  const response = await axios.get(`${SITE_URL + server}/${fractionID}`, requestConfig);
  const isSuccess = response && response.status === 200 && response.data;
  if (!isSuccess) throw new Error('Ошибка при получении данных с сайта');

  // Переводим HTML таблицы в JSON
  const parsedTables = parse(response.data);
  const isSuccessParsed = parsedTables && parsedTables.results && parsedTables.results[0];
  if (!isSuccessParsed) throw new Error('Ошибка при парсе таблиц из HTML');

  // Создаем свой массив с полученными данными из таблицы
  const playersInfo = [];
  parsedTables.results[0].forEach(el =>
    playersInfo.push({
      id: el['#'],
      nickname: el['Игрок'],
      rank: el['Ранг'] === 'Лидер' ? 10 : +el['Ранг'],
      online: el['Статус'] === 'Сейчас играет',
    }),
  );
  return playersInfo;
};
