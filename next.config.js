// next.config.js
module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/lost-found-hub',
          permanent: true,
        },
      ]
    },
  }
  