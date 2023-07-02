---
sidebar_position: 2
title: The Plugin Utility
---

## Writing a Plugin

This document describes how to develop and submit a plugin for Volumio3. Please read the following chapters carefully.

Volumio integrates a command line utility which automates and simplifies the process.

### Create your plugin

The first step is cloning the [volumio-plugins-sources repository](https://github.com/volumio/volumio-plugins-sources) just head there and click "fork" on top right. This creates a fork of the plugins repository on your github account.

The plugin helper utility allows you to easily create your own plugin, by providing tools for the main steps.
Its functions are:

```bash

volumio plugin

volumio plugin init

volumio plugin refresh

volumio plugin package

volumio plugin submit

volumio plugin install

volumio plugin update

```

### volumio plugin init

Call the utility with this command to create a new plugin from scratch. First
of all it will copy the repository, then create the appropriate folder as
specified by the user and prepare all the basic files, finally it will install
your plugin locally. Here is a step by step example:

```bash

volumio@volumio:~$ volumio plugin init

Welcome to the Volumio Plugin Creator!
You have to decide which category your plugin belongs to, then you have to select
a name for it, leave us the rest
Warning: make meaningful choices, you cannot change them later!

Creating a new plugin
? volumio plugins folder non existent, please type your github username Ghembs
cloning repo:
git clone https://github.com/yourgithubname/volumio-plugins-sources.git
Cloning into '/home/volumio/volumio-plugins-sources'...
Done, please run command again

volumio@volumio:~$ volumio plugin init

Welcome to the Volumio Plugin Creator!
You have to decide which category your plugin belongs to, then you have to select
a name for it, leave us the rest ;)
Warning: make meaningful choices, you cannot change them later!

Creating a new plugin
? Please select
the Plugin Category
  1) audio_interface
  2) music_service
  3) system_controller
  4) system_hardware
  5) user_interface
  Answer: 1

```


```bash
Creating a new plugin
? Please select
the Plugin Category audio_interface
? Please insert a name for your plugin test
NAME: test CATEGORY: audio_interface
Copying sample files
? Please insert your name (Volumio Team)
? Insert a brief description of your plugin (100 chars) test plugin
Installing dependencies locally
npm WARN test@1.0.0 No repository field.

Congratulation, your plugin has been succesfully created!
You can find it in: /home/volumio/volumio-plugins-sources/test

```
After you selected a category and a name for the plugin, it will ask for yours,
(Volumio team is the default name), then for a description and finally it will
create it and install it locally (/data/plugins/...).

#### downloading/installing dependencies

If you need npm packages for your plugin you might want to install the build-essential package to be able to download and compile packages using the node package manager (npm).

```bash

volumio@volumio:~$ sudo apt-get install build-essential

```
You can now install package from npm by using the simple command npm install {package name}, e.g. npm install epoll

### volumio plugin refresh

Call the utility with this command if you worked on the source and you want a
 plugin to be updated locally (/data/plugins/...). You have to call it from an
appropriate plugin folder, in the path of `volumio-plugins`.

```bash
volumio@volumio:~/volumio-plugins-sources/test$ volumio plugin refresh

This command will copy all your plugin\'s file in the correspondent folder in data

Updating the plugin in Data
Plugin succesfully refreshed

```

In order to have the refreshed files take effect restart the Volumio service.

```
volumio vrestart
```

### volumio plugin package

Call the utility with this command if you want to create a package with the
content of a plugin's folder. It will take care of npm dependencies and put the
zip in the same folder.

```bash
volumio@volumio:~/volumio-plugins-sources/test$ volumio plugin package

This command will create a package with your plugin

Compressing the plugin
No modules found, running "npm install"
npm WARN test@1.0.0 No repository field.
Plugin succesfully compressed

```
You can find more details below about the zip file and the contents you must
have in your plugin's folder

### volumio plugin submit

Call this command from your plugin direcctory when you want to submit your plugin to the plugins store.

Please refer to the [Plugin Publishing Section](/plugins/plugin-publishing)
