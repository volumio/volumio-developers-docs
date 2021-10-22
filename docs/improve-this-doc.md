---
id: improve-docs
title: Improve this documentation
sidebar_label: Improve this documentation
hide_title: true
sidebar_position: 6
---

# Contribute to this Documentation

Everyone knows how tedious it is to write documentation. But it is extremely important for every project, especially for Volumio. So if you find something incomplete, missing or wrong feel free to edit this doc and improve it.

If you don't feel like editing this doc yourself, you can at least tell us what you would change [here](https://volumio.org/forum/documentation-feedback-t6425.html)!

## How this doc works

This DOC is powered by [Docusaurus](https://docusaurus.io/) and the source is hosted on [Github](https://github.com/volumio/volumio-developers-docs).
To edit it, simply clone it, edit the pages located under /docs and issue a pull request. You can do so either via command line or with a graphical tool, I personally suggest  [GitKraken](https://www.gitkraken.com/).


## Setting up environment

Clone it:

```bash
git clone https://github.com/volumio/volumio-developers-docs
```

Install dependencies:

Install [Node.js](https://nodejs.org/en/download/)

Node.js version 14.0.0 is needed. A good tool to use to install the appropriate node version is [NVM](https://github.com/nvm-sh/nvm)

```bash
nvm install 14.0.0
nvm use 14.0.0
```

Install prerequisites (only once):

```bash
cd volumio-developers-docs
npm install
```

## Edit the documentation

Launch the documentation locally:

```bash
npx docusaurus start
```

Open `http://localhost:3000` to view the documentation as you work on it.


Edit it
  * I suggest [Atom.io IDE](https://atom.io/) together with  [Markdown Preview](https://atom.io/packages/markdown-preview) but any text editor will do.
  * Check the [Docusaurus Documentation](https://docusaurus.io/docs) for best practices and tips.
  * This doc is written in Markdown language, see the [Markdown Guide](https://docusaurus.io/docs/markdown-features) to get used to it.

Commit your contribution

```bash
git commit -m "Hey I changed this and that"
```

Send a pull request, so Volumio Team will evaluate your contribution.

Once your PR gets accepted, in 2 minutes your contribution will be available to the whole community.
