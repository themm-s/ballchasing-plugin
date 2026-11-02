# Ballchasing Replay Player

This folder is the ready-to-share package. It contains the prebuilt BakkesMod plugin, the browser userscript, and the full setup guide.

## Package contents

- `plugin/BallchasingReplayPlayer.dll` - copy into `%APPDATA%\bakkesmod\bakkesmod\plugins\`.
- `browser/ballchasing-play-in-game.user.js` - import into Tampermonkey.
- `INSTRUCTION.md` - setup steps in Russian and English.

## Quick start

1. Copy the DLL from `plugin/` into the BakkesMod `plugins` folder.
2. Start Rocket League. In the BakkesMod console (**F6**), run `plugin load BallchasingReplayPlayer`. If it is already loaded, run `plugin reload BallchasingReplayPlayer`.
3. Save your API key as the first line of `%APPDATA%\bakkesmod\bakkesmod\data\ballchasing\api_key.txt`. Never enter the key in the BakkesMod console; console commands are written to its log.
4. Install Tampermonkey and import the userscript from `browser/`.
5. Refresh ballchasing.com and click **Play in game** next to a replay.

See [INSTRUCTION.md](release/INSTRUCTION_ENG.md) for the full guide and troubleshooting. Keep `api_key.txt` private; it is not included in this package.
