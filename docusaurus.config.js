// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Volumio Developers Documentation',
  tagline: 'Music is cool',
  url: 'https://developers.volumio.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'volumio',
  projectName: 'volumio-developers-docs',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/volumio/volumio-developers-docs/tree/master',
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Developers',
        logo: {
          alt: 'Volumio logo',
          src: 'img/volumio-logo.png',
        },
        items: [
          {
            href: 'https://github.com/volumio/volumio-developers-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Resources',
            items: [
              {
                label: 'Volumio.com',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Community Forum',
                href: 'https://community.volumio.org',
              },
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/volumio',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/volumio',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'https://volumio.org/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/volumio',
              },
              {
                label: 'Status',
                href: 'https://status.volumio.com',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Volumio SRL. Built with Docusaurus.`,
      },
      prism: {
        theme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
      }
    }),
};

module.exports = config;
