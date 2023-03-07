---
sidebar_position: 3
title: The Plugin Structure
---

Volumio plugins are .zip files which created as the last step of the plugin creation, and contain a standardized set of files.

## Mandatory Files

| Name         | Format      | Content                                                                                                                               |
|:-------------|:------------|:--------------------------------------------------------------------------------------------------------------------------------------|
| install.sh   | Bash script | This file contains a script of action and dependencies installation needed for the plugin. It’s a BASH script. It MUST be executable. |
| index.js     | javascript  | This is  the main plugin  file, written in node.js                                                                                                 |
| node_modules | folder      | Folder that contains all node modules needed                                                                                          |
| config.json  | json        | This is the plugin configuration file, where all users settings are stored.                                             |
| Package.json | json        | This file contains description of the plugin and the list of required node dependencies                                               |
| Uninstall.sh | Bash script | This file contains the script to uninstall the plugin.                                                                                   |


Here you will find more details for each files listed above, what they contain, how to write a working plugin. Examples based on Spop plugin.

### Install.sh
This file allows download and installation of dependencies for the plugin. It’s a executable file written in BASH.

```bash
#!/bin/bash

echo "Installing Spop Dependencies"
sudo apt-get update
sudo apt-get -y install libasound2-dev libreadline-dev libsox-dev libsoup2.4-dev libsoup2.4-1 libdbus-glib-1-dev libnotify-dev --no-install-recommends

echo "Installing Spop and libspotify"

ARCH=$(cat /etc/os-release | grep ^VOLUMIO_ARCH | tr -d 'VOLUMIO_ARCH="')
HARDWARE=$(cat /etc/os-release | grep ^VOLUMIO_HARDWARE | tr -d 'VOLUMIO_HARDWARE="')

cd /tmp
wget http://repo.volumio.org/Packages/Spop/spop-${ARCH}.tar.gz
sudo tar xvf /tmp/spop-${ARCH}.tar.gz -C /
rm /tmp/spop-${ARCH}.tar.gz

sudo chmod 777 /etc/spopd.conf

#required to end the plugin install
echo "plugininstallend"

```

IMPORTANT THINGS  TO NOTICE

* Use "echo" to detail what's going during the install, this will help you debugging, and notify the user what goes on during install
* If you need to differentiate between architectures, refer to the aforementioned example. The possible architectures for Volumio are: arm, armv7, armv8, x86_amd64.
* We have no environment variable set, so make sure you cd in the desired folder
* Ensure to give proper permissions to file you'll need to edit later on (node runs with user volumio)
* To avoid installing unwanted stuff, make sure to place `--no-install-recommends` after your to-install list
* `echo "plugininstallend"` must be placed at the end of the install script to signal that installation has ended.

:::danger
Under no circumstances a Plugin shall write or edit any file under /volumio and /myvolumio folder. This applies both to install.sh and index.js performed operations.
:::

### Index.js

Index.js
This file is the main file of the plugin. It is written in javascript. Please refer to [Index.js section](/plugins/index-js)  for a detailed explanation.

#### config.json
File in which is saved default parameters, and the way saved parameters will be saved.

```json
{
  "enabled": {
    "type": "boolean",
    "value": false
  },
  "username": {
      "type": "string",
      "value": ""
  },
  "password": {
    "type": "string",
    "value": ""
  },
  "bitrate": {
    "type": "boolean",
    "value": true
  }
}
```

### Package.json

The package.json contains informations about your plugin. There's no need to create it manually since it's automatically created at plugin creation stage.

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

IMPORTANT THINGS  TO NOTICE

The relevant parts are:

* name: this will be the plugin's name folder
* prettyName: this will be the Plugin's name for the user
* licence: use any licence, you're not bound to GPL here
* dependencies: indicate the node modules this plugin requres, to avoid yourself the extra hassle of 2 different zip files for x86 and ARM, try to choose node modules that don't need to be compiled or rely on external dependencies
* make sure to indicate propery the pretty name, icon and plugin type. The more straightforward, the better
* version, this is used to keep track of version and request for updates if new versions are found
* boot priority, accepts a numerical value from 1 to 10. Useful if you need to start your plugin after one another. 1 means it is started first, 10 means it will be started at last.

### Uninstall.sh
Bash file. As install file MUST be executable. Here you will basically revert what you did in the install.sh file .


| Name              | Format                                    | Content                                                                                                       |
|:------------------|:------------------------------------------|:--------------------------------------------------------------------------------------------------------------|
| i18n              | folder                                    | contains string_en.json and other strings to translate the plugin                                             |
| Uiconfig.json     | json                                      | this file describe the UI of the plugin.                                                                      |
| Other             | Text, image, sound, script, executable... | required file / script to use in the plugin such as executable or service,image, sound,  application key...   |
| RequiredConf.json | json                                      | Configuration key or variables mandatory for the plugin to work. Useful to add a new parameter with an update |

Details and examples of optional files
Depending on the plugin, other file may be nedeed.

### UIConfig.json
This file describes the user interface for the plugin configuration, that will appear while clicking on the cog. Please note that the filename is case sensitive.

Please refer to UI Configuration Pages for reference.

### I18n
This folder contains languages strings if you want to translate your plugin

You have to have one file per language.

The file naming is “strings_en.json” for english.

Of course replace “en” by the language to be translated “it”, “fr”, “es”.

This is a json file.
```json
{
  "spotify_username":"Spotify username",
  "spotify_password":"Spotify password",
  "high_bitrate":"High quality",
  "search_results":"Number of results",
  "plugins":"Last.fm",
  "last_fm_username":"Last.fm username",
  "last_fm_password":"Last.fm password",
  "SEARCH_SONGS_SECTION":"Spotify songs",
  "SEARCH_ALBUMS_SECTION":"Spotity albums",
  "SEARCH_ARTISTS_SECTION":"Spotify artists"

}
```

### Other
Your plugin may require other files such as image, sound, executable, configuration files etc. You have to include these files in the ZIP file and ensure proper permissions if they'll need to be edited.
