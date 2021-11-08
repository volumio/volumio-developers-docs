---
id: I2S DACs
title: I2S DACs
sidebar_label: I2S DACs
hide_title: true
sidebar_position: 7
---

# I2S DACs \ Shields on Volumio

I2S DACs, also known as Audio Hats or Audio Shields are neat hardware extensions (especially for Raspberry PI) that provide an high-quality Audio output. Their support is therefore
very important in Volumio.

Given the ever-increasing number of DACs on the market, **manufacturer support is required in order to have them available and supported by Volumio.**

If your particular DAC Model is not available or not supported in Volumio, please notify the DAC manufacturer pointing them to this guide.

## How to get an I2S DAC supported by Volumio

In order to work, 2 components are needed:

* The kernel driver shall be present in the kernel that Volumio Uses. If that's not the case, see [here](#kernel-support).
* Volumio shall know how to configure and enable the DAC, by having proper entries in its I2S DAC Json file.

:::note
Given the increasing number of I2S DACs on the market, Volumio's policy is to accept Pull Requests only for DACs that require a specific overlay to work, and this overlay is not already stated in the JSON File. This way we reduce to the minimum the I2S DACs list and offer a compelling user experience.

If, for example your DAC requires the "hifiberry-dacplus" overlay to work, we won't merge your request for a new DAC that uses this overlay. On your end, simply suggest your users the appropriate entry to select in Volumio to make your DAC work.
:::

### The dacs.json file

Volumio stores all compatibility data for i2s dac in a single file: the  [dacs.json file](https://github.com/volumio/volumio3-backend/blob/master/app/plugins/system_controller/i2s_dacs/dacs.json),
here's a brief extract of it (November 13th 2020):

```json
{ "devices":[
  {"name":"Raspberry PI","data":[
    {"id":"adafruit-max98357","name":"Adafruit MAX98357","overlay":"max98357a","alsanum":"2","alsacard":"MAX98357A","mixer":"","modules":"","script":"","needsreboot":"yes"},
    {"id":"allo-boss-dac","name":"Allo BOSS","overlay":"allo-boss-dac-pcm512x-audio","alsanum":"2","alsacard":"BossDAC","mixer":"Digital","modules":"","script":"","needsreboot":"yes"},
    {"id":"allo-digione","name":"Allo DigiOne","overlay":"allo-digione","alsanum":"2","alsacard":"sndallodigione","mixer":"","modules":"","script":"","needsreboot":"yes"},

    {"id":"bassfly","name":"BassFly-uHAT","overlay":"rpi-dac","alsanum":"2","alsacard":"sndrpirpidac","mixer":"","modules":"","script":"bassfly-init.sh","needsreboot":"yes"},
    {"id":"bassfly-mic","name":"BassFly-uHAT with I2S Mic","overlay":"googlevoicehat-soundcard","alsanum":"2","alsacard":"sndrpigooglevoi","mixer":"","modules":"","script":"bassfly-init.sh","needsreboot":"yes"},
    {"id":"generic-dac","name":"Generic I2S DAC","overlay":"hifiberry-dac","alsanum":"2","alsacard":"sndrpihifiberry","mixer":"","modules":"","script":"","needsreboot":"yes"},
    {"id":"hifiberry-amp","name":"HiFiBerry Amp","overlay":"hifiberry-amp","alsanum":"2","mixer":"Master","modules":"","script":"","needsreboot":"yes"},
    {"id":"hifiberry-amp2","name":"HiFiBerry Amp2","overlay":"hifiberry-dacplus","alsanum":"2","alsacard":"sndrpihifiberry","mixer":"Digital","modules":"","script":"","eeprom_name":"HiFiBerry DAC+","i2c_address":"4d","needsreboot":"no"},
    {"id":"hifiberry-dac","name":"HiFiBerry DAC","overlay":"hifiberry-dac","alsanum":"2","alsacard":"sndrpihifiberry","mixer":"","modules":"","script":"","needsreboot":"yes"},
    {"id":"hifiberry-dacplus","name":"HiFiBerry DAC Plus","overlay":"hifiberry-dacplus","alsanum":"2","alsacard":"sndrpihifiberry","mixer":"Digital","modules":"","script":"","eeprom_name":"HiFiBerry DAC+","i2c_address":"4d","needsreboot":"no"}
  ]},
  {"name":"Tinkerboard","data":[
    {"id":"hifiberry-dacplus","name":"HiFiBerry DAC Plus","overlay":"hifiberry-dacplus","alsanum":"0","mixer":"Digital","modules":"","script":"","needsreboot":"yes"}
  ]}
]}

```


### Adding a new DAC to DACs JSON File

Basically edit the dac.json appropriately and send us a pull request. Here's what you need to change:

* Add your DAC under the specific device it's for, like Raspberry PI or Odroid
* id: An unique identifier. Lowercase and without spaces, possibly use the dt-overlay as id.
* name: the name that will represent your DAC (this is what users will see in the dropdown menu)
* overlay: mandatory for raspberry PI. The [DTOverlay parameter](https://www.raspberrypi.org/documentation/configuration/device-tree.md),  used to enable the DAC. If more than one, comma separate them.
* alsaname: how your DAC is named by alsa. Starting from Volumio3 this value is mandatory.
* alsanum: leave it to 2 for RPI and Odroid, 1 for Sparky, 0 for Thinkerboard
* mixer: if your DAC has an hardware mixer, indicate it here, so it will be automatically configured
* script: if you need a script to be launched on start, write here the name and place the script inside the  [scripts folder](https://github.com/volumio/volumio3-backend/tree/master/app/plugins/system_controller/i2s_dacs/scripts)
* eeprom_name:for Raspberry PI only. Volumio can automatically detect your DAC and configure it without user intervention. The auto-detection method works best by reading the eeprom that every HAT should have. Specifically, we look for the content of `/proc/device-tree/hat/product` . So indicate here such content. Arrays are also accepted, in case this varies over time. This will look like `"eeprom_name":["JustBoom DAC HAT","JustBoom DAC HAT V1","JustBoom DAC HAT V 10"]`
* i2c_address: for Raspberry PI only. As a fallback, we can detect also a specific DAC via its i2c address. Indicate it here. This is a fallback mechanism in case eeprom reading won't work. IMPORTANT: Many dacs can have the same i2c address so use it only if there isn't  already another dac with the same address.
* needs_reboot: on Raspberry PI we can enable some DACs without rebooting, by appying the DTPARAM in userspace. This doesn't work with all dacs. So please try first with this set to no. If that works and you can hear sound, fine. If that does not happen it means that your DAC is not capable of being activated without rebooting, and set this to yes.

### How to correctly identify alsaname for your DAC

To identify the alsa name:

* Connect via [SSH](/SSH%20Connection)
* Enable your DAC (via UI or adding the appropriate dt-overlay parameter to /boot/userconfig.txt)
* Reboot the PI
* Launch the command:

```bash
aplay -l
```

You will get:

```bash
volumio@volumio-home:~$ aplay -l
**** List of PLAYBACK Hardware Devices ****
card 0: b1 [bcm2835 HDMI 1], device 0: bcm2835 HDMI 1 [bcm2835 HDMI 1]
  Subdevices: 4/4
  Subdevice #0: subdevice #0
  Subdevice #1: subdevice #1
  Subdevice #2: subdevice #2
  Subdevice #3: subdevice #3
card 1: Headphones [bcm2835 Headphones], device 0: bcm2835 Headphones [bcm2835 Headphones]
  Subdevices: 4/4
  Subdevice #0: subdevice #0
  Subdevice #1: subdevice #1
  Subdevice #2: subdevice #2
  Subdevice #3: subdevice #3
card 2: sndrpihifiberry [snd_rpi_hifiberry_dac], device 0: HifiBerry DAC HiFi pcm5102a-hifi-0 [HifiBerry DAC HiFi pcm5102a-hifi-0]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```

The alsaname is the string which sits between : and [ . In this case "sndrpihifiberry" .

### Kernel Support

On Raspberry PI, Volumio uses the Raspberry PI foundation Kernel, and we do our best to keep it up to date with the stable release.
99% of the time this means that the driver needed for a particular DAC is already present in Volumio.

If, for any particular reason, your driver is not included yet, a custom driver can be included by following those steps:

* Compile the required kernel module for your driver
* Pack it as a tar file, which will be unpacked in / (so it must contain all the folder structure /lib/modules/kernel_version and /boot/overlay)
* Send a Pull Request to Volumio3 OS Builder, adding the link [here](https://github.com/volumio/volumio3-os/blob/eb54e7ce35ffc7a5ee691ae7c2b6186fb2134407/recipes/devices/pi.sh#L170)
* Send a Pull Request to [Volumio I2S DACs Sources repository](https://github.com/volumio/volumio-i2s-dacs-sources) uploading the full sources (modules, firmwares (if any) and device tree overlay). **This step is mandatory to ensure GPL compliance of Volumio**.

:::tip
A good reference can be taken at [Bassowl drivers archive](https://raw.githubusercontent.com/Darmur/bassowl-hat/master/driver/archives/modules-rpi-5.4.83-bassowl.tar.gz).
:::

:::caution
This is meant to be a temporary solution until your driver gets merged in the official Raspberry PI kernel. It is strongly suggested to get it merged into the kernel to ensure maximum compatibility and safety.
:::

## Advanced configuration of I2S DACs alsa parameters

Some I2S DACs expose, via alsa, additional configuration options such as:
* DSP settings
* Filer settings
* Volume gain

Volumio can show the use a convenient way to set those advanced parameters in the Playback Settings configuration page, if properly instructed.

To do so, the DSP settings that the user should be able to manage shall be added to the [DAC DSP JSON file](https://github.com/volumio/volumio3-backend/blob/master/app/plugins/audio_interface/alsa_controller/dac_dsp.json).

The file looks like:

```json
{
  "cards": [
	{"name": "Allo Piano 2.1", "dsp_options":["Subwoofer mode","Lowpass","Dual Mode", "DSP Program"]},
	{"name": "Allo Katana", "dsp_options":["DSP Program","Deemphasis","DoP"]},
	{"name": "PianoDACPlus", "dsp_options":["Subwoofer mode","Lowpass","Dual Mode", "DSP Program"]},
	{"name": "Hifiberry DAC Plus", "dsp_options":["DSP Program","Clock Missing Period"]},
	{"name": "JustBoom DAC Boards", "dsp_options":["DSP Program","Clock Missing Period"]},
	{"name": "JustBoom Digi Boards", "dsp_options":["Tx Source"]},
	{"name": "HDMI Out", "dsp_options":["hdmi audio format Function"]},
	{"name": "TauDAC - DM101", "dsp_options":["Anti-Clipping Mode","Dither","Filter"]},
	{"name": "Volumio ESS 9028QM", "dsp_options":["FIR Filter Type","IIR Filter Select"]},
	{"name": "Analog RCA Output", "dsp_options":["FIR Filter Type","IIR Filter Select"]}
  ]
}
```

Where:
* name is the card name that is shown to the user (same as name in i2s_dacs JSON file)
* dsp_options is an array of all the alsa mixer settings that the user can tune.

If you wish users to be able to tune those settings, send a Pull Request adding the DSP options you require.
