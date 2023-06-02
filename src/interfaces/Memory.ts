import { Like } from './Like'

export interface Memory {
  id: string
  userId: string
  coverUrl: string
  excerpt: string
  content: string
  isPublic: boolean
  createdAt: string
  likes: Like[]
}
