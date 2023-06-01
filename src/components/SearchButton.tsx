'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'
import { SearchContent } from './modal/contents/SearchModal'
import { Modal } from './modal/Modal'

export function SearchButton() {
  const [IsSearchModalOpen, setIsSearchModalOpen] = useState(false)

  const openSearchModal = () => {
    setIsSearchModalOpen(true)
  }

  const closeSearchModal = () => {
    setIsSearchModalOpen(false)
  }

  return (
    <>
      <button
        onClick={openSearchModal}
        className="text-small  flex items-center gap-2 text-left text-gray-100 hover:text-gray-50"
      >
        Search users
        <Search className="h-4 w-4" />
      </button>
      {IsSearchModalOpen && (
        <Modal onClose={closeSearchModal}>
          <SearchContent />
        </Modal>
      )}
    </>
  )
}
