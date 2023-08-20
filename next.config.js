const { createSecureHeaders } = require("next-secure-headers")
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const withPWA = require("next-pwa")
const withPlugins = require('next-compose-plugins')

function UseEsbuildMinify(config, options) {
	const terserIndex = config.optimization.minimizer.findIndex(minimizer => (minimizer.constructor.name === 'TerserPlugin'))
	if (terserIndex > -1) {
		config.optimization.minimizer.splice(
			terserIndex,
			1,
			new ESBuildMinifyPlugin(options),
		)
	}
}

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

  webpack: (config, { webpack }) => {
		config.plugins.push(
			new webpack.ProvidePlugin({
				React: 'react',
			}),
		);

		UseEsbuildMinify(config)

		return config
	}
})

module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

// https://stackoverflow.com/a/72149467
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
  })
}