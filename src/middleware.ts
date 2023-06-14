import { NextRequest, NextResponse } from 'next/server'

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`
export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    if (
      req.nextUrl.pathname.startsWith('/memories') ||
      req.nextUrl.pathname.startsWith('/users')
    ) {
      return NextResponse.redirect(signInURL, {
        headers: {
          'Set-Cookie': `redirectTo=${process.env.NEXT_PUBLIC_URL}; Path=/; HttpOnly; max-age=50`,
        },
      })
    }
  }

  NextResponse.next().headers.set('Access-Control-Allow-Origin', '*')
}
