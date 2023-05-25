import { Memory } from '../Memory'

export interface MemoryModalProps {
  memoryData: Memory
  onClose: () => void
  handleDeleteMemory: (memoryId: string) => void
}
