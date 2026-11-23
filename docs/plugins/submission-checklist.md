---
sidebar_position: 13
title: Plugin Submission Checklist
---

## Why a checklist for plugin submission

Volumio's plugin system is designed to allow a great degree of freedom for plugins developers, and we are committed to keep it that way. On the other hand, plugins shall be safe to use and don't compromise the stability of the system.
This is why every plugin, before being accepted, MUST pass a series of compliance tests.

Run through this checklist before submitting a plugin for the first time, and whenever you submit an update.

## Plugin submission checklist

### Lifecycle

- [ ] The plugin has no effect when it is only installed. Everything starts in `onStart` and is undone in `onStop`.
- [ ] `onStop` releases everything the plugin created: timers, sockets, socket.io connections, child processes, browse sources, overlays.
- [ ] `onStart` and `onStop` return a libQ (`kew`) promise, resolved on success and rejected on failure.
- [ ] Long-running processes run as systemd units, started and stopped from `onStart` and `onStop`. Never as child processes of the plugin.

### Stability

- [ ] The plugin never takes the backend down: no `process.exit`, no global `uncaughtException` handlers, no overriding `commandRouter` methods.
- [ ] Every failure of a remote API is caught, logged and turned into a rejected promise or a toast. Volumio keeps working when the service is down.
- [ ] The plugin does not assume the network is ready at start. If it needs to log in, it retries when the network is back.
- [ ] No blocking calls in handlers: no `execSync`, `spawnSync` or synchronous network calls. They freeze playback and the UI.

### Commands and permissions

- [ ] Commands run with `execFile` or `spawn` and an argument list, never a command string built from values. A value from settings never reaches a shell.
- [ ] Root is used only through `sudo` with the full path of a command on the [approved list](#approved-sudo-commands).
- [ ] No sudo with a hardcoded password (`echo volumio | sudo -S`) and no new sudoers entries.
- [ ] No world-writable permissions (`chmod 777`).

### Files

- [ ] Nothing is written under `/volumio` or `/myvolumio`, by `install.sh` or by `index.js`. See [Filesystem Architecture](/Architecture/filesystem-architecture).
- [ ] No existing file is overwritten. A configuration file already used by Volumio or by another plugin is never written.
- [ ] Generated configuration goes under `/tmp` and is rebuilt at each start. Persistent data goes under `/data`.
- [ ] Audio changes go through [AAMPP](/AAMPP/using-aampp). The plugin never edits `/etc/asound.conf`.
- [ ] The plugin never touches another plugin's files.

### Install and uninstall

- [ ] `install.sh` stops on the first error (`set -e`) and reports the failure. No `|| true` hiding a failed step.
- [ ] `install.sh` never runs npm or pip. Node dependencies are bundled in the package by `volumio plugin package`.
- [ ] Nothing is downloaded at install or at runtime without a pinned version and a checksum check.
- [ ] `uninstall.sh` removes what `install.sh` added, and nothing else.
- [ ] `install.sh` ends with `echo "plugininstallend"` and `uninstall.sh` with `echo "pluginuninstallend"`.

### Dependencies and secrets

- [ ] Every dependency in `package.json` is pinned to an exact version. No `"*"` and no unpinned git dependencies.
- [ ] No API keys, tokens or passwords in the source code.

### Hygiene

- [ ] Logs go through `this.logger`. No `console.log` left in the code.
- [ ] The plugin has a README, a license (`license` in `package.json` plus a LICENSE file) and `i18n/strings_en.json`.
- [ ] No placeholder metadata: `author`, `repository`, `details` and `changelog` are filled in.
- [ ] `package.json` lists `"os": ["bookworm"]`, `"node": ">=20"` and `"volumio": ">=4"`.

## Approved sudo commands

The `volumio` user can run these commands with `sudo` and no password. A plugin that needs root uses only these, called by their full path:

- `/bin/chmod`, `/bin/dd`, `/bin/hostname`, `/bin/ip`, `/bin/journalctl`, `/bin/kill`, `/bin/ln`, `/bin/mount`, `/bin/mv`, `/bin/rm`, `/bin/systemctl`, `/bin/tar`, `/bin/umount`
- `/sbin/dhclient`, `/sbin/dhcpcd`, `/sbin/ethtool`, `/sbin/halt`, `/sbin/ifconfig`, `/sbin/iw`, `/sbin/iwconfig`, `/sbin/iwgetid`, `/sbin/iwlist`, `/sbin/modprobe`, `/sbin/poweroff`, `/sbin/reboot`, `/sbin/shutdown`
- `/usr/bin/alsactl`, `/usr/bin/apt-get`, `/usr/bin/dcfldd`, `/usr/bin/dtoverlay`, `/usr/bin/gpio`, `/usr/bin/killall`, `/usr/bin/renice`, `/usr/bin/smbtree`, `/usr/bin/timedatectl`, `/usr/bin/unlink`
- `/usr/sbin/alsactl`, `/usr/sbin/i2cdetect`, `/usr/sbin/i2cset`, `/usr/sbin/service`, `/usr/sbin/update-rc.d`
- `/usr/bin/xset`, `/usr/bin/xinput`, `/usr/bin/tee`
- `/opt/vc/bin/tvservice`, `/opt/vc/bin/vcgencmd`

The file rules above still apply to every command on this list.
