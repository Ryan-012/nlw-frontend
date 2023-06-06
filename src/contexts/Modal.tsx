'use client'
import { ReactNode, createContext, useState } from 'react'
export const ModalContext = createContext<{
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
})

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  function closeModal() {
    setIsModalOpen(false)
  }

  function openModal() {
    setIsModalOpen(true)
  }

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}
