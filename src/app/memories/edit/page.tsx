'use client'
import { MemoryForm } from '@/components/MemoryForm'
import { api } from '@/lib/api'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Cookie from 'js-cookie'
import { useSearchParams, useRouter } from 'next/navigation'
import { FormEvent, useContext } from 'react'
import { MemoriesDataContext } from '@/contexts/MemoriesData'

export default function EditMemory() {
  const token = Cookie.get('token')
  const router = useRouter()
  const memoryId = useSearchParams().get('id')
  const { memoriesData, editMemory } = useContext(MemoriesDataContext)
  const memory = memoriesData.find((memory) => memory.id === memoryId)

  if (!memory || !memoryId) return router.push(`/error?statusCode=404`)

  async function handleEditMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl') as File

    let coverUrl = null
    let imageKey = null

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      if (fileToUpload?.size > 0) {
        // create new image on aws
        const uploadResponse = await api.post('/upload', uploadFormData)

        // set new image props
        const { objectKey, fileUrl } = uploadResponse.data
        coverUrl = fileUrl
        imageKey = objectKey

        // delete old image on aws
        await api.delete(`/deleteImage/${memory?.objectKey}`)
      }

      if (memoryId) {
        await api
          .put(
            `/memories/${memoryId}`,
            {
              coverUrl: coverUrl || memory?.coverUrl,
              objectKey: imageKey || memory?.objectKey,
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
            editMemory(memoryId, res.data)

            router.push('/')
          })
      }
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
      <MemoryForm memoryData={memory} onSaveMemory={handleEditMemory} />
    </div>
  )
}
