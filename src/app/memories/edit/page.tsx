'use client'
import { NewMemoryForm } from '@/components/NewMemoryForm'
import { Memory } from '@/interfaces/Memory'
import { api } from '@/lib/api'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Cookie from 'js-cookie'
import { useSearchParams, useRouter } from 'next/navigation'

import { useState, useEffect, FormEvent } from 'react'

export default function EditMemory() {
  const token = Cookie.get('token')
  const router = useRouter()
  const memoryId = useSearchParams().get('id')

  const [data, setData] = useState<Memory | null>(null)
  const [error, setError] = useState<String | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/memories/${memoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data)
        })
        .catch((error) => {
          setError(error.response.status)
        })
    }

    if (token && memoryId) fetchData()
  }, [memoryId, token])

  if (!memoryId || error) return router.push(`/error?statusCode=${error}`)

  async function handleEditMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl') as File

    console.log(fileToUpload?.size)
    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      if (fileToUpload?.size > 0) {
        const uploadResponse = await api.post('/upload', uploadFormData)
        coverUrl = uploadResponse.data
      }

      await api.put(
        `/memories/${memoryId}`,
        {
          coverUrl: coverUrl === '' ? data?.coverUrl : coverUrl,
          content: formData.get('content'),
          isPublic: formData.get('isPublic'),
          createdAt: formData.get('createdAt'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      router.push('/')
    }
  }
  console.log(data?.coverUrl)
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      {data ? (
        <>
          <Link
            href="/"
            className="gab-1 flex items-center text-sm text-gray-200 hover:text-gray-100"
          >
            <ChevronLeft className="h-4 w-4" />
            voltar à timeline
          </Link>
          <NewMemoryForm memoryData={data} onSaveMemory={handleEditMemory} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
