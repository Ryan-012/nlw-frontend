'use client'
import { NewMemoryForm } from '@/components/NewMemoryForm'
import { api } from '@/lib/api'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Cookie from 'js-cookie'
import { useSearchParams, useRouter } from 'next/navigation'

import { useState, FormEvent, useContext } from 'react'
import { MemoriesDataContext } from '@/contexts/MemoriesData'

export default function EditMemory() {
  const token = Cookie.get('token')
  const router = useRouter()
  const memoryId = useSearchParams().get('id')
  const { memoriesData, setMemoriesData } = useContext(MemoriesDataContext)
  const [error, setError] = useState<String | null>(null)
  const memory = memoriesData.find((memory) => memory.id === memoryId)

  if (!memory) return router.push(`/error?statusCode=404`)

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

      await api
        .put(
          `/memories/${memoryId}`,
          {
            coverUrl: coverUrl === '' ? memory?.coverUrl : coverUrl,
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
        .then((res) => {
          setMemoriesData((prevMemories) => {
            const spliceOldMemory = prevMemories.filter(
              (memory) => memory.id !== memoryId,
            )

            return [...spliceOldMemory, res.data]
          })
          router.push('/')
        })
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="gab-1 flex items-center text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>
      <NewMemoryForm memoryData={memory} onSaveMemory={handleEditMemory} />
    </div>
  )
}
