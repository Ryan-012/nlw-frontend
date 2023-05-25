import { Memory } from '../Memory'

export interface MemoryButtonProps {
  memoryData: Memory
  handleDeleteMemory: (memoryId: string) => void
}
