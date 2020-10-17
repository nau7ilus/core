'use strict';

const { helpers, getFractionPlayers } = require('../src');

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
