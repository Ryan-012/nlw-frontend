'use client'

import { Memory } from '@/interfaces/Memory'
import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

export const MemoriesDataContext = createContext<{
  memoriesData: Memory[]
  setMemoriesData: Dispatch<SetStateAction<Memory[]>>
}>({
  memoriesData: [],
  setMemoriesData: () => {},
})

export default function MemoriesDataProvider({
  children,
}: {
  children: ReactNode
}) {
  const [memoriesData, setMemoriesData] = useState<Memory[]>([])

  return (
    <MemoriesDataContext.Provider value={{ memoriesData, setMemoriesData }}>
      {children}
    </MemoriesDataContext.Provider>
  )
}
