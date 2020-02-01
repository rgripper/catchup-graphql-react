## Mock UI

https://www.figma.com/file/aUvy3Dn4u3EIZzUFfUa2ireu/Workshop-Chat?node-id=166%3A50

## Installing

Run `npm i` in the root folder, it will install both a server and client.

## Running

- Run `npm run server` to start the GraphQL server
- Run `npm run client` to start the React app

## Data structures

### Message

- `id` - String
- `creationDate` - Date
- `senderId` - String (`id` of a user who sent the message)
- `text` - String

### User

- `id` - String
- `name` - String
- `avatarUrl` - String | null

### Chat

- `users` - list of users
- `messages` - list of messages
