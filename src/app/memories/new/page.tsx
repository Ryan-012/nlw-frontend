'use client'
import { NewMemoryForm } from '@/components/NewMemoryForm'
import { api } from '@/lib/api'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { FormEvent } from 'react'
import router from 'next/router'
import Cookie from 'js-cookie'

export default function NewMemory() {
  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      coverUrl = uploadResponse.data

      const token = Cookie.get('token')
      await api.post(
        '/memories',
        {
          coverUrl,
          content: formData.get('content'),
          isPublic: formData.get('isPublic'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      router.push('/')
    } else {
      alert('error')
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

      <NewMemoryForm onSaveMemory={handleCreateMemory} />
    </div>
  )
}
