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
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <div className=" mx-4 flex max-h-screen  min-w-[60%]  flex-col  space-y-2 rounded-lg bg-gray-900 p-4">
        {children}
      </div>
    </div>
  )
}
