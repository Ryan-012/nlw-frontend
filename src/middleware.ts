import { NextRequest, NextResponse } from 'next/server'

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`
export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(signInURL, {
      headers: {
        'Set-Cookie': `redirectTo=${process.env.NEXT_PUBLIC_URL}; Path=/; HttpOnly; max-age=50`,
      },
    })
  }

  return NextResponse.next().headers.set('Access-Control-Allow-Origin', '*')
}

export const config = {
  matcher: ['/memories/:path*', '/users/:path*'],
}
