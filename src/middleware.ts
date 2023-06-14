import { NextRequest, NextResponse } from 'next/server'

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`
export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(signInURL, {
      headers: {
        'Set-Cookie': `redirectTo=${process.env.NEXT_PUBLIC_URL}${req.nextUrl.pathname}; Path=/; HttpOnly; max-age=50`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  middleware: async () => {
    return {
      matcher: (req: NextRequest) => {
        if (req.nextUrl.pathname === '/') {
          return false // Não executar o middleware para a rota raiz
        }

        return ['/memories/:path*', '/users/:path*'].some((pattern) =>
          req.nextUrl.pathname.startsWith(pattern),
        )
      },
    }
  },
}
