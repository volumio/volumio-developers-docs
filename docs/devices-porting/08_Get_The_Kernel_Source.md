---
sidebar_position: 8
title: Kernel Sources
---

## Getting the kernel Source ##

### Use the Armbian Tool to get a patched kernel 4.4.xx ###

We will use the armbian toolset to download and compile the kernel only.  
Go to __<https://docs.armbian.com/Developer-Guide_Build-Preparation/>__  
Make sure you meet the requiremens in “What do I need”

Follow the guide to run the script

    ./compile.sh KERNEL_ONLY=yes KERNEL_KEEP_CONFIG=yes

From the menu, select “Kernel and u-boot packages”.  
Then select “Tinkerboard” from the supported boards menu.  
You will then have to select the kernel version & branch.  
Pick the default “Vendor Provided / legacy (3.4.x – 4.4.x)” from the presented list.  
This is not really “Vendor provided” in the true sense, as Armbian then clones from the mqmaker repo as explained above.  
You can forget about u-boot and sunxi-tools, we do not need them for our purpose.  

When you're building on a Ubuntu machine, you can continue with kernel compilation in

    $HOME/sources/linux-rockchip/miqi/release-4.4

Otherwise  

    cd $HOME/sources/linux-rockchip/miqi/release-4.4
    sudo make clean
    cd ..
    sudo tar cvfJ release-4.4.tar.xz ./release-4.4  

...then transfer the tarball, create $HOME/sources/linux-rockchip/miqi on your target system and unpack it in the miqi folder


## Getting the kernel Source ##
### Use the Asus Tinkerboard Repo to get the kernel source (4.4.xx) ###

Luckily, Asus now supplyies their own kernel repo
Start with downoading onto your Home folder

    git clone http://github.com/tinkerboard/debian_kernel linux-asus

### Patches ###

Sometimes, especially with brand new boards, changes are made by others, which would suit Volumio but haven't found their way into the (vendor's) kernel repo.
A way to get these into our kernel is applying these changes aspatches.
At the time of writing, 3 patches are know, which I will apply from one single patch file.
It deals with:

- Change in the kernel compile 'makefile' in order to eliminate two very strict syntax checks, which causes the compile to fail with gcc version 6. The best way would have been to fix the sources, but I consider that a task for the maintainers.
- Change to the behavior of two board leds, allowing one blinking as a heartbeat and the other one blinking for disk activity
- an entry in the usb quirks table, to show the internal usb audio device to show a friendly name (Tinkerboard)  

The patch is in the plaform-asus folder, under "patches": Volumio-Kernel.patches.  
Copy it to the kernel root folder and apply as follows:  

    patch -p1 < Volumio-Kernel.patches
