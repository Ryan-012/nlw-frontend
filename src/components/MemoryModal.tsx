import Image from 'next/image'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { X } from 'lucide-react'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { MemoryModalProps } from '../interfaces/props/MemoryModal'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MemoriesDataContext } from '@/contexts/MemoriesData'
import { useContext } from 'react'

dayjs.locale(ptBr)

export function MemoryModal({ memoryId, onClose }: MemoryModalProps) {
  const { memoriesData, setMemoriesData } = useContext(MemoriesDataContext)
  const token = Cookie.get('token')
  const memory = memoriesData.find((memory) => memory.id === memoryId)

  if (!memoryId || !memory) return null

  async function handleDeleteMemory() {
    await api.delete(`/memories/${memoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setMemoriesData((prevMemories) =>
      prevMemories.filter((memory) => memory.id !== memoryId),
    )
    onClose()
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

        <div className=" flex justify-end space-x-1">
          <Link
            href={`/memories/edit?id=${memory.id}`}
            className="inline-block rounded-full bg-green-500 px-3 py-2 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
          >
            Editar
          </Link>
          <button
            onClick={handleDeleteMemory}
            className="inline-block rounded-full bg-green-500 px-2 py-2 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  )
}
