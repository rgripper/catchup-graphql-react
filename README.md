#Mock UI is here:

https://www.figma.com/file/aUvy3Dn4u3EIZzUFfUa2ireu/Workshop-Chat?node-id=166%3A50

#Installing

Run `yarn` in the root folder, it will instlal both server and client

#Running

Run `client:start` to start the React app
Run `server:start` to start the GraphQL server

#Data Format

Message

- id - String
- creationDate - Date
- senderId - String
- text - String

> Extra task: Serialize/Deserialize `creationDate` as JS Date
> (https://www.apollographql.com/docs/graphql-tools/scalars/#date-as-a-scalar)

User

- id - String
- name - String
- avatarUrl - String | null

ChatState

- users - list of User
- messages - list of Message

> Extra task: Try subscriptions when a new message/user is added
> (https://www.apollographql.com/docs/react/data/subscriptions/)
