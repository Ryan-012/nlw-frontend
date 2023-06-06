'use client'
import { Camera } from 'lucide-react'
import { MediaPicker } from './layout/MediaPicker'
import { FormEvent } from 'react'
import { Memory } from '@/interfaces/Memory'

export function MemoryForm({
  memoryData,
  onSaveMemory,
}: {
  memoryData?: Memory
  onSaveMemory: (event: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <form onSubmit={onSaveMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
            type="checkbox"
            name="isPublic"
            id="isPublic"
            defaultChecked={memoryData?.isPublic}
          />
          Tornar memória pública
        </label>
        <input
          type="date"
          name="createdAt"
          max={new Date().toISOString().split('T')[0]}
          required={true}
          defaultValue={
            memoryData?.createdAt ? memoryData?.createdAt.substr(0, 10) : ''
          }
          className="rounded border-gray-400 bg-gray-700 "
        />
      </div>
      <MediaPicker coverUrl={memoryData?.coverUrl} />
      <textarea
        name="content"
        defaultValue={memoryData?.content}
        spellCheck={false}
        required={true}
        className="w-full flex-1 resize-none  rounded border-0 bg-transparent  p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400   focus:outline-none"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}
