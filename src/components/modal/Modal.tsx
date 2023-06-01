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
      className="fixed inset-0 flex  items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-4 flex  min-h-[50%] min-w-[30%] flex-col space-y-2 rounded-lg bg-gray-900 p-4 md:min-h-[40%] md:min-w-[40%] lg:min-h-[40%] lg:min-w-[50%] xl:min-h-[40%] xl:min-w-[60%] 2xl:min-h-[40%] 2xl:min-w-[70%]"
      >
        {children}
      </div>
    </div>
  )
}
