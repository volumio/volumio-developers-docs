---
sidebar_position: 8
title: Modal Windows
---


Modals can be used to interact with users in case an explicit action or an acknowledgment is needed.

Here's an example:

```javascript
var modalData = {
                  title: 'Modal',
                  message: 'Something occured, you may react, or close this window',
                  size: 'lg',
                  buttons: [
                    {
                      name: 'Close',
                      class: 'btn btn-warning'
                    },
                    {
                      name: 'React',
                      class: 'btn btn-info',
                      emit:'react',
                      payload:''
                     }  
                  ]
                }

self.commandRouter.broadcastMessage("openModal", modalData);
```

In the previous example, a modal is created by the plugin at runtime.
Whatever button the user presses, the modal will close.

The "React" button however will also emit a "react" socketIO event, which can be handled directly by the plugin.

You can handle this even by using the `callMethod` facility.

For example, to ask a user whether to ignore an error or call a specific function in your plugin, you can build a message like:

```javascript
var modalData = {
                  title: 'Modal',
                  message: 'Something occured, you may react, or close this window',
                  size: 'lg',
                  buttons: [
                    {
                      name: 'Close',
                      class: 'btn btn-warning'
                    },
                    {
                      name: 'React',
                      class: 'btn btn-info',
                      emit:'react',
                      payload: {'endpoint':'miscellanea/myplugin','method':'functionToCall','data':''} 
                     }  
                  ]
                }

self.commandRouter.broadcastMessage("openModal", modalData);
```
