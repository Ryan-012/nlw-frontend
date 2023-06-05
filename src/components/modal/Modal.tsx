import { ReactNode } from 'react'

export function Modal({
  children,
  onClose,
}: {
  children: ReactNode
  onClose: () => void
}) {
  return (
    <div
      onClick={onClose}
      className="fixed left-0 right-0 top-0 z-50 flex h-screen max-h-full  w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 p-4 md:inset-0"
    >
      <div
        className="relative flex h-3/5 w-full min-w-[400px] max-w-[40%] flex-col items-center justify-between rounded-lg bg-gray-900 p-4 lg:max-w-[30%] "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
