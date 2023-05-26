'use client'
import { NewMemoryForm } from '@/components/NewMemoryForm'
import { api } from '@/lib/api'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { Memory } from '@/interfaces/Memory'
// import { EmptyMemories } from '@/components/EmptyMemories'
import Error from 'next/error'

export default async function EditMemory() {
  const router = useRouter()
  const memoryId = useSearchParams().get('id')
  const token = Cookie.get('token')
  const [error, setError] = useState<boolean>(false)
  const [memory, setMemory] = useState<Memory | null>(null)
  useEffect(() => {
    async function fetchMemory() {
      try {
        const response = await api.get(`/memories/${memoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const memoryData: Memory = response.data
        setMemory(memoryData)
      } catch (error) {
        return <Error statusCode={500} />
      }
    }

    if (token) {
      fetchMemory()
    }
  }, [memoryId, token])

  // if (error) return <Error statusCode={500} />
  // console.log(memory)
  async function handleEditMemory(event: FormEvent<HTMLFormElement>) {}

  if (!memory) return <div>...Loading</div>
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="gab-1 flex items-center text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>

      <NewMemoryForm />
    </div>
  )
}
