'use client'

import { Like } from '@/interfaces/Like'
import { Memory } from '@/interfaces/Memory'
import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

export const MemoriesDataContext = createContext<{
  memoriesData: Memory[]
  setMemoriesData: Dispatch<SetStateAction<Memory[]>>
  likeMemory: (likeData: Like, memoryId: string) => void
  unlikeMemory: (likeData: Like, memoryId: string) => void
  editMemory: (memoryId: string, updatedMemory: Memory) => void
  addMemory: (newMemory: Memory) => void
  deleteMemory: (memoryId: string) => void
}>({
  memoriesData: [],
  setMemoriesData: () => {},
  likeMemory: () => {},
  unlikeMemory: () => {},
  editMemory: () => {},
  addMemory: () => {},
  deleteMemory: () => {},
})

export default function MemoriesDataProvider({
  children,
}: {
  children: ReactNode
}) {
  const [memoriesData, setMemoriesData] = useState<Memory[]>([])

  function likeMemory(likeData: Like, memoryId: string) {
    setMemoriesData((prevMemoriesData) => {
      const updatedMemories = prevMemoriesData.map((memory) => {
        if (memory.id === memoryId) {
          const updatedLikes = [...memory.likes, likeData]
          return { ...memory, likes: updatedLikes }
        }
        return memory
      })
      return updatedMemories
    })
  }

  function unlikeMemory(likeData: Like, memoryId: string) {
    setMemoriesData((prevMemoriesData) => {
      const updatedMemories = prevMemoriesData.map((memory) => {
        if (memory.id === memoryId) {
          const updatedLikes = memory.likes.filter(
            (like) => like.id !== likeData.id,
          )
          return { ...memory, likes: updatedLikes }
        }
        return memory
      })
      return updatedMemories
    })
  }

  function editMemory(memoryId: string, updatedMemory: Memory) {
    setMemoriesData((prevMemoriesData) => {
      const updatedMemories = prevMemoriesData.map((memory) => {
        if (memory.id === memoryId) {
          return { ...memory, ...updatedMemory }
        }
        return memory
      })
      return updatedMemories
    })
  }

  function addMemory(newMemory: Memory) {
    setMemoriesData((prevMemoriesData) => {
      return [...prevMemoriesData, newMemory]
    })
  }

  function deleteMemory(memoryId: string) {
    setMemoriesData((prevMemories) =>
      prevMemories.filter((memory) => memory.id !== memoryId),
    )
  }

  return (
    <MemoriesDataContext.Provider
      value={{
        memoriesData,
        setMemoriesData,
        likeMemory,
        unlikeMemory,
        editMemory,
        addMemory,
        deleteMemory,
      }}
    >
      {children}
    </MemoriesDataContext.Provider>
  )
}
