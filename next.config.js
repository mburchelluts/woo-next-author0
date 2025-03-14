const path = require("path");

let allowedImageWordPressDomain = "";

try {
    const wordpressURL = new URL(process.env.NEXT_PUBLIC_WORDPRESS_URL);
    allowedImageWordPressDomain = wordpressURL.hostname;
} catch (error) {
    console.error("Error parsing NEXT_PUBLIC_WORDPRESS_URL:", error.message);
}

module.exports = {
    trailingSlash: true,
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };

        return config;
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    /**
     * We specify which domains are allowed to be optimized.
     * This is needed to ensure that external urls can't be abused.
     * @see https://nextjs.org/docs/basic-features/image-optimization#domains
     */
    images: {
        domains: [allowedImageWordPressDomain, 'via.placeholder.com'],
    },
};

