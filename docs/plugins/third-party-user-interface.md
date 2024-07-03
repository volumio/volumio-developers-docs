---
sidebar_position: 12
title: Third Party User Interface
---

Starting from Version 3.735, Volumio has introduced the capability to show other user interfaces besides the one shipped with the system.

You can therefore develop a plugin that will expose a new user interface.

IMPORTANT:

- The user interface should be placed inside one folder, and the path must be known. For example: /data/plugins/user_interfaces/your_plugin_name/uiname
- The user interface should ALWAYS provide a functionality to select alternative user interfaces. A good suggestion would be to expose a selector that mimics the capabilities of Volumio's system settings page.
- Third-party and core user interfaces can be selected by heading to Settings -> System -> User Interface Style.


## Adding your user interface to Volumio

To register the availability of your user interface, simply invoke this function from the onStart function of your plugin:

```javascript
var uiData = {
    "uiPrettyName": "Now Playing",
    "uiName": "now-playing",
    "uiPath": "/data/plugins/user_interface/now_playing/ui"
  }
  self.commandRouter.registerThirdPartyUI(uiData);
```

This function is invoked in the onStart function of the plugin, so the properties are added only if and when the plugin is started.

Parameters:
* uiPrettyName: mandatory. This is the pretty name of the UI. It will be displayed in the UI selector in System Settings.
* uiName: mandatory. This is simply a lowercase name. No spaces allowed.
* uiPath: mandatory. This is the path where the UI is loaded from.


NOTE: If you fail to see the new UI in the System Settings Menu, check the logs to see if all parameters are invoked correctly. As a safeguard, if the UI cannot be found in the specified uiPath, the UI won't be added.
