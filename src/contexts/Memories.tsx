'use client'
import { Memory } from '@/interfaces/Memory'
import { MemoriesContextValue } from '@/interfaces/contexts/Memories'
import { ReactNode, createContext, useState } from 'react'

export const MemoriesContext = createContext<MemoriesContextValue>({
  memoriesData: [],
  setMemoriesData: () => {},
})

export function MemoriesProvider({ children }: { children: ReactNode }) {
  const [memoriesData, setMemoriesData] = useState<Memory[]>([])

  return (
    <MemoriesContext.Provider value={{ memoriesData, setMemoriesData }}>
      {children}
    </MemoriesContext.Provider>
  )
}
