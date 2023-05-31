'use client'
import { api } from '@/lib/api'
import { decode } from 'jsonwebtoken'
import { Heart } from 'lucide-react'
import { useState, useEffect } from 'react'

export function MemoryLikeButton({
  memoryId,
  token,
}: {
  memoryId: string
  token: string
}) {
  const [likeId, setLikeId] = useState<string | null>(null)
  const userId = decode(token)?.sub

  useEffect(() => {
    const checkLikedMemory = async () => {
      try {
        const response = await api.get(`/memories/like/${memoryId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const likedMemory = response.data.find(
          (like: any) => like.userId === userId,
        )
        if (likedMemory) {
          setLikeId(likedMemory.id)
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (token && memoryId) {
      checkLikedMemory()
    }
  }, [token, memoryId, userId])

  async function likeMemory() {
    await api
      .post(
        '/memories/like',
        { memoryId, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        setLikeId(res.data.id)
      })
  }

  async function unlikeMemory() {
    await api
      .delete(`/memories/like/${likeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setLikeId(null)
      })
  }

  return (
    <>
      {likeId ? (
        <button onClick={unlikeMemory} className="border-none bg-transparent">
          <Heart className="h-4 w-4 fill-green-600 stroke-green-600" />
        </button>
      ) : (
        <button onClick={likeMemory} className="border-none bg-transparent">
          <Heart className="h-4 w-4 hover:fill-green-600 hover:stroke-green-600 hover:transition-all hover:duration-300 " />
        </button>
      )}
    </>
  )
}
