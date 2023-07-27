---
sidebar_position: 9
title: Kernel Options
---

## Changing Kernel Options, Volumio requirements ##

### Mandatory Kernel Modules
support for initramfs  
overlayfs  
squashfs  
nls437
nfs server  
usb audio
iptables  
cifs
hid multitouch (CONFIG_HID_MULTITOUCH=m)

## Device dependent modules
board's soc sound options and codecs
all built-in wireless options (wifi/bluetooth) and possible wifi dongles  

:::tip
Wherever possible, configure the options as a module (no need to blow up the kernel for things we not always use)
:::
