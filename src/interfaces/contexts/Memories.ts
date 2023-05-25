import { Memory } from '../Memory'
import { Dispatch, SetStateAction } from 'react'
export interface MemoriesContextValue {
  memoriesData: Memory[]
  setMemoriesData: Dispatch<SetStateAction<Memory[]>>
}
