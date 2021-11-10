---
sidebar_position: 1
title: Volumio AAMPP Overview
---

# Volumio Advanced Audio Modular Processing Pipeline

## Introduction

The Advanced Audio Modular Processing Pipeline (AAMPP from now on) is a facility built into Volumio that allows plugins to take any audio (from any service and source) and do processing on it, and chaining to multiple processing modules.
This allows a potentially huge customizability of audio processing modules, working with each other.

We’ve built Volumio AAMPP in a way that also plugin developers can take advantage of it, by defining an API to add their processing modules as Volumio plugins.
And the best of it all is that, when no modules are doing DSP or any manipulation, playback stays bit-perfect.

## AAMPP Framework application examples

As an example: audio is played from TIDAL Connect, then fed into a parametric equalizer, then sent to network endpoints for synchronized playback.

Other things that can now be possible with Volumio AAMPP are:

* Synchronized multiroom playback
* Adaptive resampling
* Resampling for all sources
* Playing silence when audio is not in use
* DSP and EQ on all sources
* Playback to Bluetooth headsets
* Playback to Chromecast or SONOS
* And this is possible for all sources: Spotify, Spotify Connect, TIDAL, TIDAL Connect, Radios, Bluetooth, Analog inputs etc.
