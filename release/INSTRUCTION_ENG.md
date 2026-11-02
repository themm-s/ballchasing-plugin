# Ballchasing Replay Player

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
