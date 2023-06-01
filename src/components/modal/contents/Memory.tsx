import Image from 'next/image'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { MemoryModalProps } from '../../../interfaces/props/MemoryModal'
import Link from 'next/link'
import { MemoriesDataContext } from '@/contexts/MemoriesData'
import { useContext } from 'react'

dayjs.locale(ptBr)

export function MemoryContent({ memoryId }: MemoryModalProps) {
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
  }
  return (
    <>
      <div className=" flex max-h-[50%] w-[90%] max-w-[90%] justify-center bg-red-800 lg:w-[50%]">
        <Image
          src={memory.coverUrl}
          width={200}
          height={200}
          alt="Memory Image"
          className=" aspect-square h-full w-full rounded-lg  object-cover"
        />
      </div>
      <div>
        <time className="text-base text-gray-100">
          {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
        </time>
        <p className="break-words text-lg leading-relaxed">{memory.content}</p>
      </div>

      <div className=" space-x-1">
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
    </>
  )
}
