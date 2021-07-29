const { createSecureHeaders } = require("next-secure-headers")
const withPWA = require("next-pwa")
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins(
  [withPWA, {
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
    },
  }], {

  webpack5: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,

  async headers() {
    return [{
      source: "/(.*)",
      headers: createSecureHeaders({
        forceHTTPSRedirect: [true, { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true }],
        referrerPolicy: "same-origin",
        xssProtection: "block-rendering",
      }).concat({ key: "CodIT", value: "HappyCoding" },
        { key: "Developed-by", value: "Catry in Goyang-si" }),
    }]
  },

})
