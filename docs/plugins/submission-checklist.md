---
sidebar_position: 13
title: Plugin Submission Checklist
---

## Why a checklist for plugin submission

Volumio's plugin system is designed to allow a great degree of freedom for plugins developers, and we are committed to keep it that way. On the other hand, plugins shall be safe to use and don't compromise the stability of the system.
This is why every plugin, before being accepted, MUST pass a series of compliance tests.

Before submitting a plugin, make sure your plugin satisfies all the subsequent requirements.

## Plugin submission checklist

The plugin submission checklist can be found [here](https://docs.google.com/spreadsheets/d/1eRl7ZlMUjOuWTXcSjBgFmO9RI8a3ZJ1U10pi1CWtWy0/edit#gid=0)

Please execute your tests before submitting a plugin for the first time, or whenever you submit an update.

## Common Reasons for Failure

Those are the most common reasons for plugins to be rejected:

#### Plugin lifecycle errors

The plugin's effect shall NOT be applied simply by installing the plugin, shall start only when onStart is called and stop when onStop is called.

Example: A plugin that creates a socket.io connection, shall not establish it when plugin is loaded. But it shall do it only after the onStart function is called. This connection shall be closed when the onStop function is called.

#### Leftover logs

Usually, when developing, lots of console.logs are used. Leaving them when plugin is published will pollute logs and make our support team's life harder when troubleshooting.

#### Overwriting System Files

Before installing your plugin, check if a file you want to write with install.sh is already there. If it is, you shall not overwrite it with your plugin. Check also that you are not reinstalling any utility that Volumio uses or writing to or over a configuration file already in use by a Volumio plugin.  
