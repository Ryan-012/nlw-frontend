import { EmptyMemories } from '@/components/EmptyMemories'
import { MemoryButton } from '@/components/MemoryButton'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import Image from 'next/image'
import { Memory } from '@/interfaces/Memory'
import { cookies } from 'next/headers'
import { getUser } from '@/lib/auth'
import { MemoryLikeButton } from '@/components/MemoryLikeButton'

dayjs.locale(ptBr)

export default async function Home() {
  const isAuthenticated = cookies().has('token')
  const token = cookies().get('token')?.value
  const user = getUser()

  if (!isAuthenticated) return <EmptyMemories />

  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data

  if (memories.length === 0) return <EmptyMemories />

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory: Memory) => {
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
            <MemoryButton memoryData={memory} />

            <MemoryLikeButton memoryId={memory.id} userId={user.sub} />
          </div>
        )
      })}
    </div>
  )
}
