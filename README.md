# GraphQL Note-Taking App

Simple note-taking app with GraphQL, Next.js, Apollo Server, and PostgreSQL.

## Quick Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup PostgreSQL database**
   - Create database: `createdb notes_db`
   - Create `backend/.env` file with your database URL:
     ```
     DATABASE_URL="postgresql://your_username@localhost:5432/notes_db?schema=public"
     ```

3. **Initialize database**
   ```bash
   cd backend && npm run db:push
   ```

4. **Start servers**
   ```bash
   npm run dev
   ```

## Access

- **Frontend**: http://localhost:3000
- **GraphQL Playground**: http://localhost:4000/graphql

## Seed Data (Optional)

```bash
cd backend && npm run db:seed
```

That's it! 🚀