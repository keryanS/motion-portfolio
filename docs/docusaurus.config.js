// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Système de Design de l\'État',
  tagline: 'Documentation développeur',
  favicon: 'img/favicon.ico',
  deploymentBranch: 'gh-pages',

  // Set the production url of your site here
  url: 'https://your-docusaurus-test-site.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/dsfr/',

  // GitHub pages  deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'keryanS', // Usually your GitHub org/user name.
  projectName: 'motion-portfolio', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          includeCurrentVersion: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Accueil',
        logo: {
          alt: 'Service d\'Information du Gouvernement',
          src: 'img/gouvernement-logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/GouvernementFR/dsfr',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documentation',
                to: 'docs/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/GouvernementFR/dsfr',
              },
              {
                label: 'Npm',
                href: 'https://npm.com/GouvFR/dsfr',
              },
            ],
          },
          {
            title: 'Le DSFR',
            items: [
              {
                label: 'Nous contacter',
                href: 'https://gouvfr.atlassian.net/servicedesk/customer/portals',
              },
              {
                label: 'Support',
                href: 'https://www.systeme-de-design.gouv.fr/centre-de-support',
              },
              {
                label: 'Communaute',
                href: 'https://www.systeme-de-design.gouv.fr/communaute',
              },
            ],
          },
          {
            title: 'Liens utiles',
            items: [
              {
                label: 'Charte de l\'Etat',
                href: 'https://www.gouvernement.fr/marque-Etat',
              },
              {
                label: 'Obtenir l\'agrément',
                href: 'https://www.systeme-de-design.gouv.fr/utilisation-et-organisation/procedure-des-agrements',
              },
              {
                label: 'Notes de version',
                href: 'https://www.systeme-de-design.gouv.fr/a-propos/versions/version-courante',
              },
            ],
          },
        ],
        copyright: `Sauf mention contraire, tous les contenus de ce site sont sous licence etalab-2.0`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
