'use client'
import { api } from '@/lib/api'
import { ArrowRight } from 'lucide-react'
interface MemoryButtonProps {
  memoryId: string
  token: string | undefined
}
export function MemoryButton({ memoryId, token }: MemoryButtonProps) {
  async function handleMemoryClick() {
    const response = await api.get(`/memories/${memoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response.data)
  }

  return (
    <button
      onClick={handleMemoryClick}
      className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
    >
      Ler mais
      <ArrowRight className="h-4 w-4" />
    </button>
  )
}
