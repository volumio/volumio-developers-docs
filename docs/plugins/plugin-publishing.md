---
sidebar_position: 7
title: Publish your plugin
---

Until you publish your plugin into Volumio's Plugin Store, your plugin will not be visible in the Volumio Store.

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

Use the volumio plugin publish utility:

```bash
volumio plugin publish
```

This will publish or update your plugin.
