import Image from 'next/image'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { X } from 'lucide-react'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { MemoryModalProps } from '../interfaces/props/MemoryModal'
import { useRouter } from 'next/navigation'
dayjs.locale(ptBr)

export function MemoryModal({ memory, onClose }: MemoryModalProps) {
  const router = useRouter()
  if (!memory) {
    return null
  }
  const token = Cookie.get('token')

  async function handleDeleteMemory() {
    await api.delete(`/memories/${memory.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    router.refresh()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className=" mx-4 flex max-h-screen  min-w-[60%]  flex-col  space-y-2 rounded-lg bg-gray-900 p-4">
        <button
          onClick={onClose}
          className=" ml-auto text-gray-200 hover:text-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mb-4 flex flex-row justify-center">
          <Image
            src={memory.coverUrl}
            width={200}
            height={200}
            alt="Memory Image"
            className="w-3/4  rounded-lg"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <time className="text-base text-gray-100">
            {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
          </time>
          <p className="break-words text-lg leading-relaxed">
            {memory.content}
          </p>
        </div>
        {/* Edit and Delete buttons */}
        <div className=" flex justify-end space-x-1">
          <button className="inline-block rounded-full bg-purple-500 px-3 py-2 font-alt text-sm uppercase leading-none text-black hover:bg-purple-600">
            Editar
          </button>
          <button
            onClick={handleDeleteMemory}
            className="inline-block rounded-full bg-purple-500 px-2 py-2 font-alt text-sm uppercase leading-none text-black hover:bg-purple-600"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  )
}
