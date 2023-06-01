'use client'
import { ArrowRight } from 'lucide-react'
import { MemoryButtonProps } from '../interfaces/props/MemoryButton'
import { Modal } from './modal/Modal'
import { MemoryContent } from './modal/contents/Memory'
import { useContext } from 'react'
import { ModalContext } from '@/contexts/Modal'

export function MemoryButton({ memoryId }: MemoryButtonProps) {
  const { isModalOpen, openModal, closeModal } = useContext(ModalContext)

  return (
    <div>
      <button
        onClick={openModal}
        className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
      >
        Ler mais
        <ArrowRight className="h-4 w-4" />
      </button>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <MemoryContent memoryId={memoryId} />
        </Modal>
      )}
    </div>
  )
}
