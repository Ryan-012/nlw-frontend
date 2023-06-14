'use client'
import { MemoryForm } from '@/components/MemoryForm'
import { api } from '@/lib/api'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useContext } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import { MemoriesDataContext } from '@/contexts/MemoriesData'

export default function NewMemory() {
  const token = Cookie.get('token')
  const router = useRouter()
  const { addMemory } = useContext(MemoriesDataContext)

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl') as File

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)
      const { objectKey, fileUrl } = uploadResponse.data
      coverUrl = fileUrl

      await api
        .post(
          '/memories',
          {
            coverUrl,
            objectKey,
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
          addMemory(res.data)
          router.push('/')
        })

      router.push('/')
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

      <MemoryForm onSaveMemory={handleCreateMemory} />
    </div>
  )
}
