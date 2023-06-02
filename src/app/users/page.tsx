'use client'
import { useSearchParams } from 'next/navigation'
import Cookie from 'js-cookie'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { User } from '@/interfaces/User'
import { Memory } from '@/interfaces/Memory'
import { MemoryButton } from '@/components/MemoryButton'
import { MemoryLikeButton } from '@/components/MemoryLikeButton'
import ModalProvider from '@/contexts/Modal'
import dayjs from 'dayjs'
import Image from 'next/image'
export default function UserPage() {
  const token = Cookie.get('token')
  const memoryId = useSearchParams().get('id')
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${memoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setUser(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    if (token) fetchUser()
  }, [token, memoryId, setUser])

  if (!token || !user) return <div></div>

  return (
    <>
      <div className="flex space-x-3  p-3 ">
        <Image
          src={user?.avatarUrl}
          height={200}
          width={200}
          alt=""
          className="h-16 w-16"
        />

        <div className="flex flex-col">
          <span className=" text-2xl ">{user.name}</span>
          <span className="text-gray-400">{user.login}</span>
        </div>
      </div>

      <div className=" flex  flex-col gap-10 p-8">
        {user?.memories.map((memory: Memory) => {
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
                {memory.content}
              </p>
              <div className="flex flex-row space-x-3">
                <MemoryLikeButton memoryId={memory.id} token={token} />
                <ModalProvider>
                  <MemoryButton memoryId={memory.id} memoryData={memory} />
                </ModalProvider>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
