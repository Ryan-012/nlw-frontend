'use client'
import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { useContext, useEffect } from 'react'
import Cookie from 'js-cookie'
import { MemoriesDataContext } from '@/contexts/MemoriesData'
import { MemoryItems } from '@/components/MemoryItems'

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
    return (
      <EmptyMemories
        title="Você ainda não registrou nenhuma lembrança, comece a"
        link={true}
      />
    )
  }

  return <MemoryItems />
}
