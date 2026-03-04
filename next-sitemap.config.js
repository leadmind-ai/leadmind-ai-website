/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://leadmind-ai.com",
  generateRobotsTxt: true,
  alternateRefs: [
    { href: "https://leadmind-ai.com/fr", hreflang: "fr" },
    { href: "https://leadmind-ai.com/en", hreflang: "en" },
  ],
};
