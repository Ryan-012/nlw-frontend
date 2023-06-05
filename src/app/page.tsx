'use client'
import { EmptyMemories } from '@/components/EmptyMemories'
import { MemoryButton } from '@/components/MemoryButton'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import Image from 'next/image'
import { Memory } from '@/interfaces/Memory'
import { MemoryLikeButton } from '@/components/MemoryLikeButton'
import { useContext, useEffect } from 'react'
import Cookie from 'js-cookie'
import { MemoriesDataContext } from '@/contexts/MemoriesData'
import ModalProvider from '@/contexts/Modal'

dayjs.locale(ptBr)

export default async function Home() {
  const token = Cookie.get('token')
  const { memoriesData, setMemoriesData } = useContext(MemoriesDataContext)

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await api.get('/memories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setMemoriesData(response.data)
      } catch (error) {
        console.log(error)
        setMemoriesData([])
      }
    }
    if (token) fetchMemories()
  }, [token, setMemoriesData])

  if (!token || memoriesData.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className=" flex  flex-col gap-10 p-8">
      {memoriesData.map((memory: Memory) => {
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
            <p className="break-words text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>
            <div className="flex flex-row space-x-2">
              <MemoryLikeButton memoryId={memory.id} token={token} />
              <span>{memory.likes.length}</span>
              <ModalProvider>
                <MemoryButton memoryId={memory.id} />
              </ModalProvider>
            </div>
          </div>
        )
      })}
    </div>
  )
}
