import { NextResponse } from 'next/server'

export function middleware(req) {
  console.log('test')
  return NextResponse.next()
}
