const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.note.deleteMany({});
  console.log('🧹 Cleared existing notes');

  // Comprehensive seed data
  const seedNotes = [
    {
      title: "GraphQL Fundamentals",
      content: "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. Unlike REST APIs, GraphQL gives clients the power to ask for exactly what they need and nothing more. Key concepts:\n\n• Single endpoint for all operations\n• Strong type system\n• Queries, Mutations, and Subscriptions\n• Resolver functions handle data fetching\n• Schema-first development approach"
    },
    {
      title: "React Hooks Best Practices",
      content: "Essential patterns for using React hooks effectively:\n\n1. useState: For component state management\n2. useEffect: For side effects and lifecycle events\n3. useContext: For sharing data across components\n4. useCallback: Memoize functions to prevent re-renders\n5. useMemo: Memoize expensive calculations\n6. Custom hooks: Extract and reuse stateful logic\n\nRemember: Only call hooks at the top level, never inside loops, conditions, or nested functions."
    },
    {
      title: "Database Design Principles",
      content: "Key principles for effective database design:\n\n• Normalization: Eliminate data redundancy\n• Primary Keys: Unique identifier for each record\n• Foreign Keys: Maintain referential integrity\n• Indexing: Improve query performance\n• ACID Properties: Atomicity, Consistency, Isolation, Durability\n• Schema Evolution: Plan for future changes\n\nFor PostgreSQL specifically:\n• Use appropriate data types (UUID, JSONB, etc.)\n• Leverage constraints for data validation\n• Consider partitioning for large tables"
    },
    {
      title: "Apollo Client Cache Management",
      content: "Apollo Client's InMemoryCache is powerful but requires understanding:\n\n• Normalized Caching: Objects stored by __typename and id\n• Cache Policies: cache-first, network-only, cache-and-network\n• Optimistic Updates: Update UI before server response\n• Cache.modify(): Manually update cached data\n• Refetch Queries: Refresh data when needed\n• Field Policies: Custom cache behavior per field\n\nBest practices:\n- Use consistent ID fields\n- Implement proper error handling\n- Leverage optimistic responses for better UX"
    },
    {
      title: "TypeScript Advanced Types",
      content: "Powerful TypeScript features for better type safety:\n\n• Generic Types: Reusable type definitions\n• Union Types: Value can be one of several types\n• Intersection Types: Combine multiple types\n• Mapped Types: Transform existing types\n• Conditional Types: Types that depend on conditions\n• Utility Types: Pick, Omit, Partial, Required\n• Template Literal Types: String manipulation at type level\n\nExample:\ntype APIResponse<T> = {\n  data: T;\n  error?: string;\n  loading: boolean;\n}"
    },
    {
      title: "Next.js App Router Guide",
      content: "Next.js 13+ App Router introduces new patterns:\n\n• File-based routing in /app directory\n• Server Components by default\n• Client Components with 'use client'\n• Layouts for shared UI\n• Loading and Error boundaries\n• Parallel and Intercepting routes\n• Server Actions for form handling\n\nKey differences from Pages Router:\n- Nested layouts\n- Streaming and Suspense\n- Built-in SEO improvements\n- Better TypeScript integration"
    },
    {
      title: "Prisma ORM Features",
      content: "Prisma provides excellent developer experience:\n\n• Type-safe database access\n• Auto-generated client from schema\n• Database migrations\n• Introspection of existing databases\n• Query optimization and batching\n• Connection pooling\n• Multiple database support\n\nUseful commands:\n- prisma generate: Update client\n- prisma db push: Sync schema (dev)\n- prisma migrate dev: Create migration\n- prisma studio: Visual database editor\n- prisma db seed: Run seed scripts"
    },
    {
      title: "CSS Grid vs Flexbox",
      content: "When to use Grid vs Flexbox:\n\n**CSS Grid (2D Layout):**\n• Complex layouts with rows and columns\n• Card layouts and dashboards\n• Magazine-style designs\n• When you need precise control over both axes\n\n**Flexbox (1D Layout):**\n• Navigation bars\n• Centering content\n• Distribution of space in one direction\n• Component-level layouts\n• When content size determines layout\n\nOften used together: Grid for page layout, Flexbox for components."
    },
    {
      title: "API Security Best Practices",
      content: "Essential security measures for APIs:\n\n• Authentication: JWT tokens, OAuth, API keys\n• Authorization: Role-based access control (RBAC)\n• Input Validation: Sanitize and validate all inputs\n• Rate Limiting: Prevent abuse and DoS attacks\n• HTTPS Everywhere: Encrypt data in transit\n• CORS Configuration: Control cross-origin requests\n• SQL Injection Prevention: Use parameterized queries\n• Logging and Monitoring: Track suspicious activity\n\nFor GraphQL specifically:\n• Query depth limiting\n• Query complexity analysis\n• Disable introspection in production"
    },
    {
      title: "Git Workflow Strategies",
      content: "Popular Git workflows for team development:\n\n**GitFlow:**\n• Main branches: main, develop\n• Feature branches for new work\n• Release branches for deployments\n• Hotfix branches for urgent fixes\n\n**GitHub Flow:**\n• Single main branch\n• Feature branches with pull requests\n• Deploy from main branch\n• Simpler than GitFlow\n\n**Best Practices:**\n• Atomic commits with clear messages\n• Regular rebasing to keep history clean\n• Protect main branch with required reviews\n• Use conventional commit messages"
    },
    {
      title: "Performance Optimization Techniques",
      content: "Frontend performance optimization strategies:\n\n**Loading Performance:**\n• Code splitting and lazy loading\n• Image optimization (WebP, proper sizing)\n• CDN usage for static assets\n• Preloading critical resources\n• Bundle analysis and tree shaking\n\n**Runtime Performance:**\n• Memoization (React.memo, useMemo)\n• Virtual scrolling for large lists\n• Debouncing user inputs\n• Efficient re-rendering patterns\n\n**Measuring Performance:**\n• Lighthouse audits\n• Web Vitals (LCP, FID, CLS)\n• Browser DevTools profiling"
    },
    {
      title: "Docker Development Setup",
      content: "Using Docker for consistent development environments:\n\n**Dockerfile Best Practices:**\n• Multi-stage builds for smaller images\n• Layer caching optimization\n• Non-root user for security\n• .dockerignore for faster builds\n\n**Docker Compose for Full Stack:**\n• Database service (PostgreSQL)\n• Backend API service\n• Frontend development server\n• Volume mounts for hot reloading\n• Environment variable management\n• Network configuration\n\n**Development Benefits:**\n• Consistent environment across team\n• Easy onboarding for new developers\n• Isolated dependencies"
    }
  ];

  console.log(`📝 Creating ${seedNotes.length} notes...`);

  // Create notes with slight delay to ensure different createdAt times
  for (let i = 0; i < seedNotes.length; i++) {
    const note = seedNotes[i];
    await prisma.note.create({
      data: {
        title: note.title,
        content: note.content,
      },
    });
    
    // Small delay to create different timestamps
    await new Promise(resolve => setTimeout(resolve, 10));
    
    if ((i + 1) % 3 === 0) {
      console.log(`✅ Created ${i + 1}/${seedNotes.length} notes`);
    }
  }

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`• ${seedNotes.length} notes created`);
  console.log('• Topics covered: GraphQL, React, TypeScript, Next.js, Prisma, and more');
  console.log('• Ready for testing your GraphQL queries and mutations!');
  
  // Display first few notes as confirmation
  const createdNotes = await prisma.note.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, createdAt: true }
  });
  
  console.log('\n🔍 Sample of created notes:');
  createdNotes.forEach(note => {
    console.log(`• ${note.title} (ID: ${note.id.substring(0, 8)}...)`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Database connection closed');
  });