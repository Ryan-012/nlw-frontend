import middleware from './src/middleware'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'nlw-spacetime-project.s3.amazonaws.com',
    ],
  },

  async middleware() {
    return [
      {
        handler: middleware,
        config: {
          matcher: ['/memories/:path*', '/users/:path*'],
        },
      },
    ]
  },
}

module.exports = nextConfig
