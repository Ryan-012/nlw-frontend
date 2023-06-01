'use client'

import { Search } from 'lucide-react'
import { useContext } from 'react'
import { SearchContent } from './modal/contents/Search'
import { Modal } from './modal/Modal'
import { ModalContext } from '@/contexts/Modal'

export function SearchButton() {
  const { isModalOpen, openModal, closeModal } = useContext(ModalContext)

  return (
    <>
      <button
        onClick={openModal}
        className="text-small flex  items-center gap-2 text-left  text-gray-100 hover:text-gray-50"
      >
        Search users
        <Search className="h-4 w-4" />
      </button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <SearchContent />
        </Modal>
      )}
    </>
  )
}
