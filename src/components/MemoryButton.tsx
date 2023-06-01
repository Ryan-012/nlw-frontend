'use client'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { MemoryButtonProps } from '../interfaces/props/MemoryButton'
import { Modal } from './modal/Modal'
import { MemoryContent } from './modal/contents/Memory'

export function MemoryButton({ memoryId }: MemoryButtonProps) {
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

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <MemoryContent memoryId={memoryId} onClose={closeModal} />
        </Modal>
      )}
    </div>
  )
}
