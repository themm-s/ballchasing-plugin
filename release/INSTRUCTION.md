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

## English

### Requirements

- Windows, Rocket League, and BakkesMod installed.
- A browser with the Tampermonkey extension.
- The prebuilt `BallchasingReplayPlayer.dll` and `ballchasing-play-in-game.user.js` files provided by the sender.
- A ballchasing.com API key. Do not share it in chat or enter it in the BakkesMod console.

### 1. Install the BakkesMod plugin

1. Close Rocket League before replacing an installed DLL.
2. Copy the provided `BallchasingReplayPlayer.dll` to `%APPDATA%\bakkesmod\bakkesmod\plugins\`.
3. Start Rocket League with BakkesMod.
4. Open the BakkesMod console with **F6** and run:

   ```text
   plugin load BallchasingReplayPlayer
   ```

5. If the console says the plugin is already loaded, run `plugin reload BallchasingReplayPlayer`. If `plugin load` says the plugin was not found, verify the install folder and DLL filename.

### 2. Store your API key

1. Create or copy your API key on ballchasing.com.
2. Create `%APPDATA%\bakkesmod\bakkesmod\data\ballchasing\api_key.txt`.
3. Put the key on the first line and save the file. Do not add quotes or enter the key in the console.
4. This file contains the secret in plaintext: keep it private and do not commit it to Git. If your previous key was written to the BakkesMod log, revoke it on the website and create a new one.

### 3. Install the website userscript

1. Install Tampermonkey from your browser's extension store.
2. Open the Tampermonkey Control Panel, then choose **Utilities > Import from file**.
3. Select the provided `ballchasing-play-in-game.user.js` and make sure the userscript is enabled.
4. Refresh ballchasing.com. With Rocket League running and the plugin loaded, an active **Play in game** button will appear next to replay titles. The button stays disabled until the website establishes a WebSocket connection to the plugin.

### 4. Play a replay

Click **Play in game** next to a replay. The plugin downloads it through the ballchasing.com API, caches it under `%APPDATA%\bakkesmod\bakkesmod\data\ballchasing\dl\`, and starts it in Rocket League. Non-empty cached files are reused.

### Troubleshooting

- No buttons: make sure Tampermonkey is enabled for `ballchasing.com`, Rocket League is running, and `BallchasingReplayPlayer` is loaded; then refresh the page.
- Button is disabled: open the F6 console, run `plugin reload BallchasingReplayPlayer`, and refresh the page.
- HTTP 401: the API key is missing or invalid. Check `api_key.txt`.
- HTTP 403: the key cannot access this replay.
- HTTP 404: the replay is missing or unavailable.
- HTTP 429: the download rate limit was reached; wait and retry later.
- With a VPN in TUN mode, local connections usually work directly. If the handshake fails, check whether the VPN intercepts `localhost`, `127.0.0.1`, or `::1`.
