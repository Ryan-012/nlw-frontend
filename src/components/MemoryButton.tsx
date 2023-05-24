'use client'
import { api } from '@/lib/api'
import { ArrowRight } from 'lucide-react'

import { useState } from 'react'
import { Memory } from '../../interfaces/memory/Memory'
import { MemoryModal } from './MemoryModal'

interface MemoryButtonProps {
  memoryId: string
  token: string | undefined
}
export function MemoryButton({ memoryId, token }: MemoryButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [memoryData, setMemoryData] = useState<Memory | null>(null)

  async function fetchMemoryData() {
    try {
      const response = await api.get(`/memories/${memoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const memoryData = response.data
      setMemoryData(memoryData)
      setIsModalOpen(true)
    } catch (error) {
      console.error('Error fetching memory:', error)
    }
  }
  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <>
      <button
        onClick={fetchMemoryData}
        className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
      >
        Ler mais
        <ArrowRight className="h-4 w-4" />
      </button>

      {isModalOpen && (
        <MemoryModal memoryData={memoryData} onClose={closeModal} />
      )}
    </>
  )
}
