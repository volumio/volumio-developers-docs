---
sidebar_position: 10
title: Publish your plugin
---

Until you publish your plugin into Volumio's Plugin Store, your plugin will not be visible in the Volumio Store.

## Before you publish

Before you start the publishing procedure, please make sure:

- Please make sure you have checked your code using the [submission checklist](/plugins/submission-checklist)
- Make sure the package.json is complete, like it is documented below
- Make sure your version is updated in package.json
- Your code is staged, committed and pushed to your fork of the plugins-sources repo, using the current version number as description
- You are logged in to MyVolumio
- Your MyVolumio account is the same as the one that previously submitted this plugin

Since Volumio3 a plugin can be submitted for multiple architectures at once. Some plugins are compatible for all architectures (no compilation), and some are compatible for a single architecture (with compilation). Make sure your compatible architectures are registered in the package.json as described above. If your plugin is only comaptible with one architecture, make sure only that architecture is registered in the package.json. A version of the plugin can be sumitted multiple times on different machines with a different architecture, please note that previously submitted architectures will not be overwritten by a re-submit of the same version.

## Publishing Workflow

Plugin publishing follows a simple workflow:

* Write your plugin
* Check that you follow our guidelines and that the plugin is stable and ready for prime-time.
* Make sure it passes the [plugin submission checklist](/plugins/writing-a-plugin)
* Volumio Team will review your plugin and provide feedbacks if something needs fixing
* You will implement the required fixes and re-submit the plugin
* If fixes are implemented properly, Volumio Team will approve the plugin and publish it.
* The same will apply for each plugin update.

## How to Publish or update

Once you completed development, or you want to update your plugin to a newer version, simply:

Enter your plugin's folder:

```bash
cd /home/volumio/volumio-plugins-sources/yourplugin
```

Use the volumio plugin submission utility:

```bash
volumio plugin submit
```

The command will check if the package.json is complete and if your code is staged, committed and pushed to your fork of the plugins-sources repo. It will also ask you to update your version if you did not do so allready. Note: if you change your version in the submit command you have to commit and push your changes again, since your package.json has changed.

When the checks are complete the command will zip your plugin directory and upload it to the plugins store.

## Plugin verification process

When you submit your plugin for the first time it needs to be validated by the volumio team. Up until the verification the plugin will not be visible in the plugins store. The plugin will be checked on the following:

- Security and malicious code
- Code quality (using https://developers.volumio.com/plugins/submission-checklist)

If there is an issue with the plugin you will be contacted on your MyVolumio email address. When verification is complete your plugin will be available in the beta channel of the plugins store. Every subsequent version of the plugin does not need to be verified, but will be put in the beta channel. Read the chapter 'Plugin channels' for the plugin beta process.

## Plugin channels

Since Volumio3 the plugins store has a stable channel (available for everyone) and a beta channel (available for beta testers). This enables developers to release test versions of a plugin so it can be tested by a small selection of people before it is publically available. This ensures that the plugin is properly tested before it's publically released, ensuring quality of the plugin and volumio as a whole. Every new plugin and all of it's subsequent versions will be put in the beta channel.

To enable the beta channel go to: http://{yourvolumioaddress}/dev and click "Plugins test mode"

When beta test is complete and quility is on par with the requirements the plugin will be promoted to the stable channel by the volumio team.

## Plugin versions

Since Volumio3 a plugin can have multiple versions. The 5 most recent submitted versions of the plugin will be available on the plugins store are available for download. This enables the plugin user to downgrade to a previous version if there is an issue with more recent versions of the plugin. The main page of the plugins store will always install the most recent version, more versions are available when pressing the "Details" button onm the plugin.

## Plugin ownership

When a plugin is published for the first time, the owner is set based on the used MyVolumio account. Only the owner (in the future multiple owners) can publish updates for the plugin, which is also checked based on the MyVolumio account.

## Issues with submitting a plugin

If you encounter any issues with the submission of a plugin, please go to: https://community.volumio.org/t/volumio3-plugins-store-issues-and-discussion/50608
