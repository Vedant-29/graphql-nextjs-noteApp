# GraphQL Note-Taking App

A simple note-taking application built with GraphQL, Next.js, Apollo Server, and PostgreSQL.

## Project Structure

```
├── backend/          # Apollo Server GraphQL API
├── frontend/         # Next.js React application
└── package.json      # Workspace configuration
```

## Prerequisites

- Node.js (>=18.0.0)
- PostgreSQL database
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies  
cd frontend && npm install
```

### 2. Database Setup

1. Create a PostgreSQL database called `notes_db`
2. Copy the environment file: `cp backend/.env.example backend/.env`
3. Update `backend/.env` with your database connection string:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/notes_db?schema=public"
   ```

### 3. Database Migration

```bash
cd backend
npm run db:push
```

### 4. Start Development Servers

From the root directory:
```bash
npm run dev
```

This will start:
- Backend GraphQL server: http://localhost:4000/graphql
- Frontend Next.js app: http://localhost:3000

## GraphQL Schema

The app includes a simple Note model with the following operations:

### Queries
- `notes` - Get all notes
- `note(id: ID!)` - Get a specific note

### Mutations  
- `createNote(title: String!, content: String!)` - Create a new note
- `updateNote(id: ID!, title: String, content: String)` - Update an existing note
- `deleteNote(id: ID!)` - Delete a note

## Development Commands

### Backend
```bash
cd backend
npm run dev          # Start development server
npm run build        # Build for production
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
```

### Frontend
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
```

## Next Steps

1. Set up your PostgreSQL database and update the `.env` file
2. Run the database migration
3. Start implementing CRUD operations in the frontend
4. Explore the GraphQL Playground at http://localhost:4000/graphql

Happy coding! 🚀