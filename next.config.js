/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'nlw-spacetime-project.s3.amazonaws.com',
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Headers',
            value: '*',
          },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
        ],
      },
    ]
  },
}
