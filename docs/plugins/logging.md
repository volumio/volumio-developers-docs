---
sidebar_position: 7
title: Logging
---

Volumio integrates a logger which can be used to signal important events in your plugin.

:::caution

Do not log every event, but just meaningful events. Also, make sure you don't leave any `console.log` in your plugin.

:::

For easier usage make sure you assign the `context.logger` instance in the constructor of your plugin:

```javascript
module.exports = ControllerSpop;
function ControllerSpop(context) {
	var self = this;
	self.logger = this.context.logger;
}
```

### Create Log Message

At any place in your code you can then call the methods of the logger instance:

```javascript
self.logger.info("Youtube::onStart Adding to browse sources");
```

The logger instance has the following methods to create log messages: `info`, `warn`, `error` and `debug`.

* `info`: for nominal events (like successfully updated configuration or successful start)
* `warn`: for non-fatal errors (like failed to retrieve optional endpoints)  
* `error`: for fatal errors (like failed to start a daemon)  
* `debug`: only for very verbose logging.  

### Logging best practices

* Make sure you remove all console.logs from your plugin before submitting.
* Log only meaningful events (do not overflow logs, this makes troubleshooting harder)
* In the log always report the plugin name, for easier troubleshooting
* Use the minimum amount of logging possible: logs consume a lot of CPU cycles


### Volumio logger library documentation

Volumio is using [winston](https://github.com/winstonjs/winston) for logging.
