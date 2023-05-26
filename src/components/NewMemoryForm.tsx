'use client'
import { Camera } from 'lucide-react'
import { MediaPicker } from './MediaPicker'
import { FormEvent, useEffect, useState } from 'react'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Memory } from '@/interfaces/Memory'
import Error from 'next/error'
// import console from 'console'

export function NewMemoryForm({
  memoryData,
  onSaveMemory,
}: {
  memoryData?: Memory
  onSaveMemory?: (event: FormEvent<HTMLFormElement>) => void
}) {
  const token = Cookie.get('token')
  const router = useRouter()
  const pathName = usePathname()
  const memoryId = useSearchParams().get('id')

  const [data, setData] = useState<Memory | null>(null)
  // const [acccess, setAccess] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/memories/${memoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setData(response.data)
        // setAccess(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (token && memoryId) fetchData()
  }, [memoryId, token])

  if (!memoryId && pathName === '/memories/edit')
    return (
      <Error
        className="text-green-400"
        statusCode={400}
        title="Memory not exists!"
      />
    )

  console.log(data)

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = memoryId ? null : formData.get('coverUrl')

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      coverUrl = uploadResponse.data

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
    }
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
          />
          Tornar memória pública
        </label>
      </div>
      <MediaPicker />
      <textarea
        name="content"
        defaultValue={data ? data.content : ''}
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400  focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}
