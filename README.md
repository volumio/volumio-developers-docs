# Volumio Developer Documentation

This documentation is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Launch the documentation locally

Install [Node.js](https://nodejs.org/en/download/)

Docusaurus 2 requires Node.js 16.14 or newer; we recommend the current LTS release (26).
A good tool to use to install the appropriate node version is [NVM](https://github.com/nvm-sh/nvm)

```bash
nvm install 26
nvm use 26
```

Clone the Documentation

```bash
git clone https://github.com/volumio/volumio-developers-docs.git
```

Install prerequisites (only once):

```bash
cd volumio-developers-docs
npm install
```

Start the documentation server locally:

```bash
npx docusaurus start
```

Open `http://localhost:3000` to view the documentation as you work on it.

### Notes on deployment

This documentation is hosted at https://developers.volumio.com and it's automatically deployed on Vercel
