---
sidebar_position: 2
title: Volumio File System Architecture
---

# Volumio File System Architecture

Volumio is highly optimized to run on SD Cards, which means also there are some strategies in place to avoid SD Card corruption:

* One of the main reasons for SD Card corruption is high number of write operations
* Therefore, to avoid SD Card wear, is preferrable to reduce to minimum write operations to SD  Card

To achieve this solution, Volumio uses a peculiar File System Architecture composed of:

* A squashfs filesystem, where Volumio OS rootfs is stored
* An overlay filesystem, which is the R/W layer used to store persistent files modification.

This has the advantage of loading the necessary OS files on RAM but allowing at the same time write operations, there is however a drawback: in case a file that resides on the base rootfs is edited, it will be mirrored on the overlay filesytem. This will mean that in subsequent OTA updates, the file in the overlay will superseed the file on Squashfs.

So, to guarantee stable and predictable operations of the system, it is suggested to NEVER overwrite files under /volumio and /myvolumio folders (recursively).

On top of that, to guarantee minimal wear of the SD Card, some strategies to avoid superflous writes operations have to be followed:

* For writing files (such as daemons conf files) is suggested to write them under /tmp folder (which is mounted on RAM). These configuration files will not be persisted after restart, so it's advised to recreate them at each start.
* If persistence is a must, the ideal location for writing this files is under /data . Where possible try to use the strategy above. 
