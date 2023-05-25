'use client'
import { EmptyMemories } from '@/components/EmptyMemories'
import { MemoryButton } from '@/components/MemoryButton'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import Cookie from 'js-cookie'
import Image from 'next/image'
import { Memory } from '../interfaces/Memory'
import { useContext, useEffect } from 'react'
import { MemoriesContext } from '@/contexts/Memories'
import { MemoriesContextValue } from '@/interfaces/contexts/Memories'

dayjs.locale(ptBr)

export default async function Home() {
  const token = Cookie.get('token')
  const { memoriesData, setMemoriesData } = useContext(MemoriesContext)
  // const fetchMemories = await api.get('/memories', {
  // headers: {
  // Authorization: `Bearer ${token}`,
  // },
  // })
  // const memories = fetchMemories.data
  // useEffect(() => {
  // setMemoriesData([...memoriesData, memories])
  // fetchMemories()
  // }, [])

  async function handleDeleteMemory(memoryId: string) {
    await api.delete(`/memories/${memoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  if (!token || memoriesData.length === 0) return <EmptyMemories />

  return (
    <div className="flex flex-col gap-10 p-8">
      {memoriesData.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <time className="flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>
            <Image
              src={memory.coverUrl}
              width={592}
              height={280}
              className="aspect-video w-full rounded-lg object-cover"
              alt=""
            />
            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>
            <MemoryButton
              memoryData={memory}
              handleDeleteMemory={handleDeleteMemory}
            />
          </div>
        )
      })}
    </div>
  )
}
