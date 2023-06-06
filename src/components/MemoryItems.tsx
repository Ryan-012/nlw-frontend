import ModalProvider from '@/contexts/Modal'
import { Memory } from '@/interfaces/Memory'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { MemoryButton } from './MemoryButton'
import { MemoryLikeButton } from './LikeButton'
import Image from 'next/image'
import { MemoriesDataContext } from '@/contexts/MemoriesData'
import { useContext } from 'react'
import Cookie from 'js-cookie'

dayjs.locale(ptBr)

export function MemoryItems() {
  const { memoriesData } = useContext(MemoriesDataContext)
  const token = Cookie.get('token')

  if (!token) return null

  return (
    <div className=" flex flex-col gap-10 p-8">
      {memoriesData.map((memory: Memory) => {
        return (
          <div key={memory.id} className="flex flex-col  space-y-4">
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
            <div className="flex flex-row space-x-3">
              <MemoryLikeButton memoryId={memory.id} token={token} />
              <span>{memory.likes.length}</span>
              <ModalProvider>
                <MemoryButton memoryId={memory.id} memoryData={memory} />
              </ModalProvider>
            </div>
          </div>
        )
      })}
    </div>
  )
}
