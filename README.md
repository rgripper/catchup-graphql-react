## Mock UI

https://www.figma.com/file/aUvy3Dn4u3EIZzUFfUa2ireu/Workshop-Chat?node-id=166%3A50

## Installing

Run `yarn` in the root folder, it will install both a server and client.

## Running

- Run `yarn client:start` to start the React app
- Run `yarn server:start` to start the GraphQL server

## Data structures

### Message

- `id` - String
- `creationDate` - Date
- `senderId` - String (`id` of a user who sent the message)
- `text` - String

> Extra task: Serialize/deserialize `creationDate` as JS Date.
> https://www.apollographql.com/docs/graphql-tools/scalars/#date-as-a-scalar

### User

- `id` - String
- `name` - String
- `avatarUrl` - String | null

> Extra task: Generate `avatarUrl` from `name` using an avatar generator. https://unicornify.pictures/

### Chat

- `users` - list of users
- `messages` - list of messages

> Extra task: Use subscriptions to notify the client when a new message or user is added.
> https://www.apollographql.com/docs/react/data/subscriptions/
