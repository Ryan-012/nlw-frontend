import { Memory } from './Memory'

export interface User {
  id: string
  githubId: number
  name: string
  login: string
  avatarUrl: string
  memories: Memory[]
}
