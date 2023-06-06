'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import Cookie from 'js-cookie'
import { api } from '@/lib/api'
import { useContext, useEffect, useState } from 'react'
import { User } from '@/interfaces/User'
import Image from 'next/image'
import { MemoriesDataContext } from '@/contexts/MemoriesData'
import { MemoryItems } from '@/components/MemoryItems'
import { EmptyMemories } from '@/components/EmptyMemories'

export default function UserPage() {
  const router = useRouter()
  const token = Cookie.get('token')
  const memoryId = useSearchParams().get('id')
  const [user, setUser] = useState<User | null>(null)
  const { setMemoriesData, memoriesData } = useContext(MemoriesDataContext)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${memoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setUser(response.data)
        setMemoriesData(response.data.memories)
      } catch (error) {
        console.log(error)
        router.push('/error?statusCode=404')
      }
    }
    if (token) fetchUser()
  }, [token, memoryId, setUser, setMemoriesData, router])

  if (!token || !user) return

  return (
    <>
      <div className="flex space-x-3 p-3  font-alt ">
        <Image
          src={user?.avatarUrl}
          height={200}
          width={200}
          alt=""
          className="h-16 w-16 rounded-lg"
        />

        <div className="flex flex-grow flex-col ">
          <span className=" text-2xl ">{user.name}</span>
          <span className="text-gray-400">{user.login}</span>
        </div>
        <div className=" flex flex-col items-center">
          <h1 className="text-2xl">{memoriesData.length}</h1>
          <span className="text-gray-400">memórias</span>
        </div>
      </div>

      {memoriesData.length !== 0 ? (
        <MemoryItems />
      ) : (
        <EmptyMemories
          title="Este usuário não possui memórias públicas!"
          link={false}
        />
      )}
    </>
  )
}
