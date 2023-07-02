---
sidebar_position: 11
title: DSP Elements Reporting
---

Starting from Version 3.4XX Volumio has an handy reporting features for all the plugins which expose DSP Settings.

This reporting is useful for Volumio to know which plugins are having some influence on sound quality and hence report that to the user.

## Enable DSP Reporting

To enable DSP reporting, simply send a message when plugin start to report the status of the DSP and its properties.

This is an example taken from Fusion DSP

```javascript
FusionDsp.prototype.reportFusionEnabled = function () {
  const self = this;

  self.logger.info('Reporting Fusion DSP Enabled');
  var fusionDSPElementsData = { "id": "fusiondspeq", "sub_type": "dsp_plugin", "preset": "FusionDSP", "quality": "enhanced" };
  try {
    self.commandRouter.addDSPSignalPathElement(fusionDSPElementsData);
  } catch(e) {}
}
```
This function is simply invoked in the onStart function of the plugin, so the properties are added only if and when the plugin is started.

Parameters:
* id: mandatory. This is the ID of the DSP. Must be unique.
* sub_type: mandatory. This is the type, for now only "dsp_plugin" is accepted.
* preset: mandatory. This is the name of plugin.
* quality: mandatory. For now only "enhanced" is accepted.

NOTE: If for some reasons the DSP message changes, it's simply required to send another "addDSPSignalPathElement" to update its content.

When the plugin is stopped, in the onStop function, simply invoke
"removeDSPSignalPathElement" function which takes as parameter an object with the id of the element pertaining the plugin.


```javascript
FusionDsp.prototype.reportFusionDisabled = function () {
  const self = this;

  self.logger.info('Reporting Fusion DSP Disabled');
  try {
    self.commandRouter.removeDSPSignalPathElement({ "id": "fusiondspeq"});
  } catch(e) {}
}

```
:::tip
VERY IMPORTANT: Always wrap in try-catch both functions addDSPSignalPathElement and removeDSPSignalPathElement to ensure backward compatibility with previous Volumio versions! Without this try-catch the system will crash once you launch the plugin!
:::
