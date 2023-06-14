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
        source: '/(.*)', // Padrão que corresponde a todas as rotas
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Permite solicitações de qualquer origem
          },
        ],
      },
    ]
  },
}
