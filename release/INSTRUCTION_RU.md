# Ballchasing Replay Player

## Русский

### Что понадобится

- Windows, Rocket League и установленный BakkesMod.
- Браузер и расширение Tampermonkey.
- Готовые файлы `BallchasingReplayPlayer.dll` и `ballchasing-play-in-game.user.js`, полученные от отправителя.
- API-ключ ballchasing.com. Не отправляйте его в чат и не вводите в консоль BakkesMod.

### 1. Установите плагин BakkesMod

1. Закройте Rocket League перед заменой уже установленного DLL.
2. Скопируйте полученный `BallchasingReplayPlayer.dll` в `%APPDATA%\bakkesmod\bakkesmod\plugins\`.
3. Запустите Rocket League с BakkesMod.
4. Откройте консоль BakkesMod клавишей **F6** и выполните:

   ```text
   plugin load BallchasingReplayPlayer
   ```

5. Если консоль сообщает, что плагин уже загружен, выполните `plugin reload BallchasingReplayPlayer`. Если команда `plugin load` сообщает, что плагин не найден, проверьте папку установки и имя DLL.

### 2. Сохраните API-ключ

1. На ballchasing.com создайте или скопируйте API-ключ.
2. Создайте файл `%APPDATA%\bakkesmod\bakkesmod\data\ballchasing\api_key.txt`.
3. Вставьте ключ первой строкой и сохраните файл. Не добавляйте кавычки и не вводите ключ в консоль.
4. Файл содержит секрет в открытом виде: не публикуйте его и не добавляйте в Git. Если старый ключ уже попал в лог BakkesMod, отзовите его на сайте и создайте новый.

### 3. Установите скрипт для сайта

1. Установите Tampermonkey из магазина расширений вашего браузера.
2. Откройте панель управления Tampermonkey, затем **Утилиты > Импорт из файла**.
3. Выберите полученный `ballchasing-play-in-game.user.js` и убедитесь, что userscript включён.
4. Обновите ballchasing.com. При запущенной игре и загруженном плагине рядом с названиями реплеев появится активная кнопка **Play in game**. Пока сайт не установит WebSocket-соединение с плагином, кнопка останется неактивной.

### 4. Запустите реплей

Нажмите **Play in game** рядом с нужным реплеем. Плагин скачает файл через API ballchasing.com, сохранит его в `%APPDATA%\bakkesmod\bakkesmod\data\ballchasing\dl\` и запустит в Rocket League. Непустые файлы в кэше повторно не скачиваются.

### Если не работает

- Нет кнопок: проверьте, что Tampermonkey включён для `ballchasing.com`, Rocket League запущена, а `BallchasingReplayPlayer` загружен; затем обновите страницу.
- Кнопка неактивна: откройте консоль F6 и выполните `plugin reload BallchasingReplayPlayer`, затем обновите страницу.
- Ошибка HTTP 401: API-ключ отсутствует или неверен. Проверьте `api_key.txt`.
- Ошибка HTTP 403: ключ не имеет доступа к этому реплею.
- Ошибка HTTP 404: реплей отсутствует или недоступен.
- Ошибка HTTP 429: достигнут лимит скачивания; подождите и повторите позже.
- Если VPN включён в TUN-режиме, локальное подключение обычно работает напрямую. Если handshake не проходит, проверьте, что VPN не перехватывает `localhost`, `127.0.0.1` или `::1`.