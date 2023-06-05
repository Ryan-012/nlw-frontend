'use client'
import Error from 'next/error'
import { useSearchParams } from 'next/navigation'

export default function ErrorPage() {
  const statusCode = useSearchParams().get('statusCode')

  return <Error statusCode={statusCode ? parseInt(statusCode) : 500} />
}
