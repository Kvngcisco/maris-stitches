/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:         process.env.NEXT_PUBLIC_SITE_URL || 'https://marisstitches.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] },
    ],
    additionalSitemaps: [],
  },
  exclude: ['/admin', '/admin/*', '/api/*'],
  generateIndexSitemap: false,
};
