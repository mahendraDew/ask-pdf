/**
 * Row shape returned by POST /api/messages (Prisma Messages, JSON-serialized).
 */
export type MessagesApiRow = {
  id: number
  chatId: number
  content: string
  createdAt: string
  role: 'user' | 'assistant'
}
