'use client'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { MemoryModal } from './MemoryModal'
import { MemoryButtonProps } from '../interfaces/props/MemoryButton'

export function MemoryButton({ memoryData }: MemoryButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function showModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <div>
      <button
        onClick={showModal}
        className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
      >
        Ler mais
        <ArrowRight className="h-4 w-4" />
      </button>

      {isModalOpen && <MemoryModal memory={memoryData} onClose={closeModal} />}
    </div>
  )
}
