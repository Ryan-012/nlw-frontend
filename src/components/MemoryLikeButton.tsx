'use client'
import { MemoriesDataContext } from '@/contexts/MemoriesData'
import { api } from '@/lib/api'
import { decode } from 'jsonwebtoken'
import { Heart } from 'lucide-react'
import { useContext } from 'react'

export function MemoryLikeButton({
  memoryId,
  token,
}: {
  memoryId: string
  token: string
}) {
  const { likeMemory, unlikeMemory, memoriesData } =
    useContext(MemoriesDataContext)
  const userId = decode(token)?.sub

  const likedMemory = memoriesData
    .find((memory) => memory.id === memoryId)
    ?.likes.find((like) => like.userId === userId)
  const likeId = likedMemory ? likedMemory.id : null

  async function handleLikeMemory() {
    await api
      .post(
        '/memories/like',
        { memoryId, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        likeMemory(res.data, memoryId)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function handleUnlikeMemory() {
    await api
      .delete(`/memories/like/${likeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        unlikeMemory(res.data, memoryId)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <button
      onClick={likedMemory ? handleUnlikeMemory : handleLikeMemory}
      className="border-none bg-transparent"
    >
      <Heart
        className={`h-4 w-4 ${
          likedMemory
            ? 'fill-green-600 stroke-green-600'
            : 'hover:fill-green-600 hover:stroke-green-600 hover:transition-all hover:duration-300'
        }`}
      />
    </button>
  )
}
