---
sidebar_position: 7
title: Logging
---

Volumio integrates a logger which can be used to signal important event in your plugin.

:::caution

Do not log every event, but just meaningful events. Also, make sure you don't leave any `console.log` in your plugin.

:::

For easier usage make sure you assign the `context.logger` instance in the consturctor of your plugin:

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

`info`: To be used for nominal events (like successfully updated configuration or successful start)
`warn`: To be used for non-fatal errors (like failed to retrieve optional endpoints)
`error`: To be used for fatal errors (like failed to start a daemon)
`debug`: To be use only for very verbose logging.

Volumio is using [winston](https://github.com/winstonjs/winston) for logging.
