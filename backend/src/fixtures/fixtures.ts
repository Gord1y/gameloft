import { Message } from '../intefaces/message.interface'
import { User } from '../intefaces/user.interface'

export const fixtures = {
  users: [
    {
      id: 1,
      name: 'John Doe',
      picture: 'https://example.com/john-doe.jpg'
    },
    {
      id: 2,
      name: 'Jane Doe',
      picture: 'https://example.com/jane-doe.jpg'
    }
  ],
  forums: [
    {
      id: 1,
      name: 'General Chat',
      users: [] as User[], // Specify the type explicitly
      messages: [] as Message[] // Specify the type explicitly
    },
    {
      id: 2,
      name: 'Tech Support',
      users: [] as User[], // Specify the type explicitly
      messages: [] as Message[] // Specify the type explicitly
    }
  ],
  messages: [
    {
      id: 1,
      forumId: 1,
      senderId: 1,
      text: 'Hello, world!',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      forumId: 2,
      senderId: 2,
      text: 'Need help with my code?',
      createdAt: new Date().toISOString()
    }
  ]
}
