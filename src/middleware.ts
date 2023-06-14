import { NextRequest, NextResponse } from 'next/server'

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (!token && req.nextUrl.pathname !== '/') {
    console.log('test')
    return NextResponse.redirect(signInURL, {
      headers: {
        'Set-Cookie': `redirectTo=${req.url}; Path=/; HttpOnly; max-age=50`,
      },
    })
  }

  return NextResponse.next()
}
export const config = {
  matcher: ['/memories/:path*', '/users/:path*'],
}
