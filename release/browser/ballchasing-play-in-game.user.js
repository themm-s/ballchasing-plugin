// ==UserScript==
// @name         Ballchasing Play in BakkesMod
// @namespace    local.ballchasing
// @version      1.0.0
// @description  Adds Play in game buttons to ballchasing replay lists.
// @match        https://ballchasing.com/*
// @match        https://www.ballchasing.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const socketUrl = 'ws://localhost:20452/';
  const replayLinkSelector = 'h2.replay-title > a.replay-link[href^="/replay/"]';
  const buttonClass = 'bc-bakkesmod-play';
  let socket = null;
  let viewerAvailable = false;
  let reconnectTimer = null;
  let scanQueued = false;

  const style = document.createElement('style');
  style.textContent = `
		h2.bc-bakkesmod-title {
			width: max-content;
		}
		h2.bc-bakkesmod-title > a.replay-link {
			display: inline !important;
		}
		.${buttonClass} {
			margin-left: 8px;
			padding: 3px 8px;
			border: 1px solid #368653;
			border-radius: 3px;
			background: #e8f5ec;
			color: #185c31;
			font-family: inherit;
			font-size: 12px;
			font-weight: 600;
			line-height: 1.4;
			vertical-align: middle;
			white-space: nowrap;
			cursor: pointer;
		}
		.${buttonClass}:hover:not(:disabled) {
			background: #d7eddf;
		}
		.${buttonClass}:disabled {
			border-color: #9aa3a0;
			background: #eef0ef;
			color: #69716d;
			cursor: not-allowed;
		}
	`;
  document.documentElement.appendChild(style);

  function updateButtons() {
    document.querySelectorAll(`button.${buttonClass}`).forEach((button) => {
      button.disabled = !viewerAvailable;
      button.title = viewerAvailable
        ? 'Open this replay in Rocket League'
        : 'Load BallchasingReplayPlayer in BakkesMod';
    });
  }

  function queueScan() {
    if (scanQueued) {
      return;
    }

    scanQueued = true;
    queueMicrotask(() => {
      scanQueued = false;
      document.querySelectorAll(replayLinkSelector).forEach((link) => {
        if (link.parentElement.querySelector(`button.${buttonClass}`)) {
          return;
        }

        link.parentElement.classList.add('bc-bakkesmod-title');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = buttonClass;
        button.textContent = 'Play in game';
        button.setAttribute('aria-label', `Play replay ${link.textContent.trim()} in game`);
        button.disabled = !viewerAvailable;
        button.title = viewerAvailable
          ? 'Open this replay in Rocket League'
          : 'Load BallchasingReplayPlayer in BakkesMod';
        button.addEventListener('click', () => {
          if (!viewerAvailable || !socket || socket.readyState !== WebSocket.OPEN) {
            return;
          }

          const replayId = new URL(link.href).pathname.split('/').filter(Boolean).pop();
          if (!replayId || !/^[a-zA-Z0-9_-]{1,128}$/.test(replayId)) {
            return;
          }

          socket.send(`ballchasing_viewer ${replayId}`);
          button.textContent = 'Sent';
          window.setTimeout(() => {
            button.textContent = 'Play in game';
          }, 1200);
        });
        link.insertAdjacentElement('afterend', button);
      });
      updateButtons();
    });
  }

  function scheduleReconnect() {
    if (reconnectTimer !== null) {
      return;
    }

    reconnectTimer = window.setTimeout(() => {
      reconnectTimer = null;
      connect();
    }, 4000);
  }

  function connect() {
    if (socket && (socket.readyState === WebSocket.CONNECTING || socket.readyState === WebSocket.OPEN)) {
      return;
    }

    viewerAvailable = false;
    updateButtons();

    try {
      socket = new WebSocket(socketUrl);
    } catch {
      socket = null;
      scheduleReconnect();
      return;
    }

    socket.addEventListener('open', () => {
      socket.send('ballchasing_viewer available');
    });
    socket.addEventListener('message', (event) => {
      if (event.data === 'true') {
        viewerAvailable = true;
        updateButtons();
      }
    });
    socket.addEventListener('close', () => {
      viewerAvailable = false;
      socket = null;
      updateButtons();
      scheduleReconnect();
    });
    socket.addEventListener('error', () => {
      viewerAvailable = false;
      updateButtons();
    });
  }

  new MutationObserver(queueScan).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  queueScan();
  connect();
})();