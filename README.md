<p align="center">
  <img alt="poster" src="https://github.com/nieopierzony/core/raw/main/assets/poster.jpg" >
</p>
<h1 align="center">Bot Core ⚙️</h1>

> Модуль в разработке. На данный момент работает только получение онлайна фракции.


## Установка

```
$ npm i @nieopierzony/core --save
или
$ yarn add @nieopierzony/core
```

## Пример

```js
const { helpers, getFractionPlayers } = require('@nieopierzony/core');

const serverID = 8;
const fractionID = 1;

// Получение онлайна фракции на указанном выше сервере
(async () => {
  const players = await getFractionPlayers(serverID, fractionID);
  const onlinePlayers = players.filter(player => player.online);
  const seniors = players.filter(player => player.rank >= 9);

  console.log(
    'Онлайн фракции "%s" на сервере %s',
    helpers.fractionNames[fractionID - 1],
    helpers.serverNames[serverID - 1],
  );
  console.log(
    '\t- Всего во фракции: %d\n\t- Из которых онлайн: %d',
    players.length,
    onlinePlayers.length,
  );
  console.log(
    '\t- Руководство:\n',
    seniors.length === 0
      ? 'В руководстве никого не найдено'
      : seniors
          .sort((a, b) => b.rank - a.rank)
          .map(
            ({ nickname, rank, online }) =>
              `${nickname} - ${rank} ранг - ${online ? 'В сети' : 'Не в игре'}`,
          )
          .join('\n'),
  );
})();
```

## API

### core.getFractionPlayers(serverID, fractionID, requestConfig);

> Обратите внимание: не делайте сразу много запросов на сайт, иначе ваш IP могут заблокировать

#### serverID

Тип: `number`

Порядковый номер сервера Arizona RP

#### fractionID

Тип: `number`

ID фракции, как указано на самом сервере

#### requestConfig

Тип: `Object`
По умолчанию: `{}`

Конфигурация запроса [Axios](https://github.com/axios/axios#axioscreateconfig)

Возвращает массив игроков во фракции:

```js
// core.getFractionPlayers(1, 2);
/**
 * => [
 *    { id: '1', nickname: 'Vasya_Pupkin', rank: 1, online: true },
 *    { id: '2', nickname: 'John_Smith', rank: 10, online: false }
 *  ]
 */
```

## Лицензия

MIT © [Philipp Zelinski](https://github.com/nieopierzony)
