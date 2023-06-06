import Image from 'next/image'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { MemoryModalProps } from '../../../interfaces/props/MemoryModal'
import Link from 'next/link'
import { MemoriesDataContext } from '@/contexts/MemoriesData'
import { useContext } from 'react'
import { usePathname } from 'next/navigation'

dayjs.locale(ptBr)

export function MemoryContent({ memoryId, memoryData }: MemoryModalProps) {
  const { memoriesData, deleteMemory } = useContext(MemoriesDataContext)
  const token = Cookie.get('token')
  const memory =
    memoryData || memoriesData.find((memory) => memory.id === memoryId)
  const pathName = usePathname()

  if (!memoryId || !memory) return null

  async function handleDeleteMemory() {
    await api
      .delete(`/memories/${memoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        deleteMemory(memoryId)
      })
  }
  return (
    <>
      <div className=" flex h-[60%]  w-[90%] justify-center lg:max-w-[80%]">
        <Image
          src={memory.coverUrl}
          width={200}
          height={200}
          alt="Memory Image"
          className=" aspect-auto h-full w-full rounded-lg  object-cover"
        />
      </div>
      <div className=" mb-2  mt-1 flex h-[30%] w-full flex-col ">
        <time className=" text-base text-gray-100">
          {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
        </time>
        <p className=" overflow-y-auto break-words  text-lg leading-relaxed">
          {memory.content}
        </p>
      </div>

      <div className="  flex w-full items-center justify-between">
        <p>{memory.isPublic ? '( Pública )' : '( Privada )'}</p>
        {pathName === '/' && (
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
        )}
      </div>
    </>
  )
}
