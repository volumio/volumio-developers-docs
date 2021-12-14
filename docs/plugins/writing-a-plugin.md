---
sidebar_position: 2
title: Writing a plugin
---

## Writing a Plugin

This document describes how to develop and submit a plugin for Volumio3. Please read the following chapters carefully.

### Plugin verification process

When you publish your plugin for the first time it needs to be validated by the volumio team. Up until the verification the plugin will not be visible in the plugins store. The plugin will be checked on the following: 

- Security and malicious code
- Code quality (using https://developers.volumio.com/plugins/submission-checklist)

If there is an issue with the plugin you will be contacted on your MyVolumio email address. When verification is complete your plugin will be available in the beta channel of the plugins store. Every subsequent version of the plugin does not need to be verified, but will be put in the beta channel. Read the chapter 'Plugin channels' for the plugin beta process.

### Plugin channels

Since Volumio3 the plugins store has a stable channel (available for everyone) and a beta channel (available for beta testers). This enables developers to release test versions of a plugin so it can be tested by a small selection of people before it is publically available. This ensures that the plugin is properly tested before it's publically released, ensuring quality of the plugin and volumio as a whole. Every new plugin and all of it's subsequent versions will be put in the beta channel. 

To enable the beta channel go to: http://{yourvolumioaddress}/dev and click "Plugins test mode"

When beta test is complete and quility is on par with the requirements the plugin will be promoted to the stable channel by the volumio team. 

### Plugin versions

Since Volumio3 a plugin can have multiple versions. The 5 most recent submitted versions of the plugin will be available on the plugins store are available for download. This enables the plugin user to downgrade to a previous version if there is an issue with more recent versions of the plugin. The main page of the plugins store will always install the most recent version, more versions are available when pressing the "Details" button onm the plugin. 

### Plugin ownership

When a plugin is published for the first time, the owner is set based on the used MyVolumio account. Only the owner (in the future multiple owners) can publish updates for the plugin, which is also checked based on the MyVolumio account. 

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
your plugin locally. Here a step by step example:

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

Before you call this coommand, please make sure: 

- Please make sure you have checked your code using the submission checklist: https://developers.volumio.com/plugins/submission-checklist
- Make sure the package.json is complete, like it is documented below
- Make sure your version is updated in package.json
- Your code is staged, committed and pushed to your fork of the plugins-sources repo, using the current version number as description
- You are logged in to MyVolumio
- Your MyVolumio account is the same as the one that previously submitted this plugin

Since Volumio3 a plugin can be submitted for multiple architectures at once. Some plugins are compatible for all architectures (no compilation), and some are compatible for a single architecture (with compilation). Make sure your compatible architectures are registered in the package.json as described above. If your plugin is only comaptible with one architecture, make sure only that architecture is registered in the package.json. A version of the plugin can be sumitted multiple times on different machines with a different architecture, please note that previously submitted architectures will not be overwritten by a re-submit of the same version. 

```bash
volumio@volumio:~/volumio-plugins-sources/test$ volumio plugin submit
```

The command will check if the package.json is complete and if your code is staged, committed and pushed to your fork of the plugins-sources repo. It will also ask you to update your version if you did not do so allready. Note: if you change your version in the submit command you have to commit and push your changes again, since your package.json has changed. 

When the checks are complete the command will zip your plugin directory and upload it to the plugins store. 

Important! Read the chapter 'Plugin verification process' for the plugin verification process.

### Issues with submitting a plugin

If you encounter any issues with the submission of a plugin, please go to: https://community.volumio.org/t/volumio3-plugins-store-issues-and-discussion/50608

### Package.json example

```json
{
	"name": "plugin_name", //plugin name
	"version": "1.0.0", //plugin version
	"description": "This is my awesome plugin", //plugin description
	"main": "index.js", //used by node.js
	"scripts": { //used by node.js
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"author": "author2000", //plugin author
	"license": "ISC", //plugin license
	"repository": "https://github.com/me/my_plugin", //plugin github repository
	"volumio_info": { //all volumio specific information
		"prettyName": "My Plugin", //plugin pretty name
		"icon": "fa-headphones", //plugin icon to be selected on font awesome
		"plugin_type": "music_service", //plugin category
		"architectures": [ //plugin compatible architectures
			"amd64",
			"armhf",
			"i386"
		],
		"os": [ //plugin compatible operating systems
			"buster"
		],
		"has_alsa_contribution": true, //If your plugin needs to capture or modify audio data, a specific instruction is required 
		"details": "Lorem ipsum", //plugin details
		"changelog": "Lorem ipsum", //plugin version changelog, will be appended to main changelog on publish
	},
	"engines": {
		"node": ">=8", //required node.js version
		"volumio": ">=3" //required volumio version
	},
	"dependencies": { //used by node.js
		"fs-extra": "^0.28.0",
		"kew": "^0.7.0",
		"v-conf": "^1.4.0",
		"nanotimer": "^0.3.15"
	}
}

```




