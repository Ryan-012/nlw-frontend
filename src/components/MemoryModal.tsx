import Image from 'next/image'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { Share, X } from 'lucide-react'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import { MemoryModalProps } from '../interfaces/props/MemoryModal'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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

  function generateToken() {
    const secretKey = 'your-secret-key' // Replace with your own secret key
    const token = jwt.sign(
      {
        content: memory.content,
        coverUrl: memory.coverUrl,
        createdAt: memory.createdAt,
      },
      secretKey,
    )
    return token
  }

  async function handleShare() {
    navigator.clipboard.writeText(`token=${generateToken()}`)
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
        <button onClick={handleShare} className="share-button">
          <Share className="h-4 w-4" />
        </button>
        {/* Edit and Delete buttons */}
        <div className=" flex justify-end space-x-1">
          <Link
            href={`/memories/edit?id=${memory.id}`}
            className="inline-block rounded-full bg-purple-500 px-3 py-2 font-alt text-sm uppercase leading-none text-black hover:bg-purple-600"
          >
            Editar
          </Link>
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
