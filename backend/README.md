## This is a GraphQL server built using Apollo Server, Express, TypeScript, and other technologies. It serves as the backend for your application and provides access to your data through a GraphQL API.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following prerequisites installed on your system:

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- npm (Node Package Manager): [https://www.npmjs.com/](https://www.npmjs.com/)

### Installation

1. Clone this repository to your local machine:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd backend
```

3. Install project dependencies:

```bash
npm install
```

### Running the Server

To start the GraphQL server, run the following command:

```bash
npm run dev
```

The server will start and listen for requests on port 4000 by default. You can customize the port and other server settings in the configuration files.

## GraphQL API

### Endpoint

The GraphQL API is accessible at the following endpoint:

- `http://localhost:4000/graphql`

### Queries

You can use GraphQL queries to retrieve data from the server. Here are some example queries you can try:

#### Query for Users

Retrieve a list of users:

```
query {
  users {
    id
    name
    picture
  }
}
```

#### Query for Forums

Retrieve a list of forums:

```
query {
  forums {
    id
    name
  }
}
```

### Query for Messages

Retrieve messages for a specific forum:

```
query {
  messages(forumId: 1) {
    id
    text
  }
}
```

## Mutations

You can use GraphQL mutations to create or update data on the server. Here are some example mutations you can try:

### Create a New Forum

Create a new forum:

```
mutation {
  createForum(name: "New Forum") {
    id
    name
  }
}
```

### Join a Forum

Join an existing forum:

```
mutation {
  joinForum(forumId: 1) {
    id
    name
    users {
      id
      name
    }
  }
}
```

### Post a Message

Post a new message to a forum:

```
mutation {
  postMessage(forumId: 1, text: "Hello, world!") {
    id
    text
    createdAt
  }
}
```

# GraphQL Schema

### Here is a description of the GraphQL schema used in this server:

## User: Represents a user with the following fields:

```
id: An integer representing the user's ID.
name: A string representing the user's name.
picture: A string representing the user's picture URL.
```

## Forum: Represents a forum with the following fields:

```
id: An integer representing the forum's ID.
name: A string representing the forum's name.
users: A list of users who have joined the forum.
messages: A list of messages posted in the forum.
```

## Message: Represents a message with the following fields:

```
id: An integer representing the message's ID.
forumId: An integer representing the ID of the forum where the message was posted.
senderId: An integer representing the ID of the user who sent the message.
text: A string representing the message text.
createdAt: A string representing the message creation timestamp.
```

# Dependencies

#### apollo-server-express: Apollo Server for Express.js

#### express: Web framework for Node.js

#### graphql: GraphQL library

#### typescript: TypeScript language support

#### [Other dependencies used in your project]
