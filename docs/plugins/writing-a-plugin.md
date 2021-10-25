---
sidebar_position: 2
title: Writing a plugin
---

## Writing a Plugin

### Create your plugin

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
your plugin locally. Here a step by step example:

:::tip
The first step is cloning the [volumio-plugins-sources repository](https://github.com/volumio/volumio-plugins-sources) just head there and click "fork" on top right
:::


```bash

volumio@volumio:~$ volumio plugin init

Welcome to the Volumio Plugin Creator!
You have to decide which category your plugin belongs to, then you have to select
a name for it, leave us the rest
Warning: make meaningful choices, you cannot change them later!

Creating a new plugin
? volumio plugins folder non existent, please type your github username Ghembs
cloning repo:
git clone https://github.com/Ghembs/volumio-plugins.git
Cloning into '/home/volumio/volumio-plugins'...
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
  2) miscellanea
  3) music_service
  4) system_controller
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
You can find it in: /home/volumio/volumio-plugins-sources/plugins/audio_interface/test

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
volumio@volumio:~/volumio-plugins-sources/plugins/audio_interface/test$ volumio plugin refresh

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
volumio@volumio:~/volumio-plugins/plugins/audio_interface/test$ volumio plugin package

This command will create a package with your plugin

Compressing the plugin
No modules found, running "npm install"
npm WARN test@1.0.0 No repository field.
Plugin succesfully compressed

```
You can find more details below about the zip file and the contents you must
have in your plugin's folder

### volumio plugin submit

Call the utility with this command if you want to upload your plugin on github.
It will automatically call the package function if no `.zip` has been found,
after asking for a last change in versioning, then it will change branch and,
depending on if the plugin and/or category has been found on the `plugins.json`
file, it will ask for additional details or both details and description.
Finally it will commit them and push them on your repo.

```bash
volumio@volumio:~/volumio-plugins/plugins/audio_interface/test$ volumio plugin publish

This command will publish the plugin on volumio plugins store

Publishing the plugin
? do you want to change your version? (leave blank for default) 1.0.0
Switched to branch 'gh-pages'
? Insert some details about your plugin (e.g. features, requirements, notes, etc
... max 1000 chars) plugin for documentation purposes
updating plugin sources:

/usr/bin/git push origin master
updating plugin packages:

/usr/bin/git push origin gh-pages
Congratulations, your package has been correctly uploaded and is ready for merging!
```
