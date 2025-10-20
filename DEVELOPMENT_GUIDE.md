# Flex Living Development Guide

## Getting Started

This guide will help you set up the Flex Living development environment and understand the development workflow.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v22.12 or higher
- **pnpm**: v10.8.1 or higher
- **Docker**: v20.10 or higher
- **Docker Compose**: v2.0 or higher
- **Git**: Latest version

## Development Environment Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd flex-living

# Install dependencies
pnpm install
```

### 2. Environment Configuration

Create the necessary environment files:

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

### 3. Database Setup

Start the development database:

```bash
# Start PostgreSQL and Redis
docker-compose up -d db redis

# Wait for services to be ready
docker-compose logs -f db
```

### 4. Start Development Servers

```bash
# Start all services in development mode
pnpm dev

# Or start individual services
pnpm --filter backend dev
pnpm --filter frontend dev
pnpm --filter storybook dev
```

## Project Structure

```
flex-living/
├── apps/                          # Applications
│   ├── backend/                   # NestJS API
│   │   ├── src/
│   │   │   ├── common/            # Shared utilities
│   │   │   ├── entities/          # Database entities
│   │   │   ├── review/            # Review module
│   │   │   ├── thrid-parties/     # External integrations
│   │   │   └── main.ts            # Application entry point
│   │   ├── test/                  # Test files
│   │   └── package.json
│   ├── frontend/                  # Next.js application
│   │   ├── src/
│   │   │   ├── app/               # App Router pages
│   │   │   ├── components/        # React components
│   │   │   ├── hooks/             # Custom hooks
│   │   │   └── providers/         # Context providers
│   │   └── public/                # Static assets
│   └── storybook/                 # Component documentation
├── packages/                      # Shared packages
│   ├── types/                     # TypeScript types
│   ├── ui/                        # UI components
│   └── utils/                     # Utilities
└── hostaway-mock-api/             # Mock API service
```

## Development Workflow

### 1. Feature Development

```bash
# Create a new feature branch
git checkout -b feature/review-approval-workflow

# Make your changes
# ... code changes ...

# Run tests
pnpm test

# Commit changes
git add .
git commit -m "feat: add review approval workflow"

# Push and create PR
git push origin feature/review-approval-workflow
```

### 2. Code Quality Standards

#### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

#### ESLint Configuration

```javascript
// eslint.config.mjs
export default [
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
];
```

#### Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### 3. Git Workflow

#### Branch Naming Convention

- `feature/description`: New features
- `bugfix/description`: Bug fixes
- `hotfix/description`: Critical fixes
- `refactor/description`: Code refactoring
- `docs/description`: Documentation updates

#### Commit Message Convention

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(review): add approval workflow
fix(api): resolve rate limiting issue
docs(readme): update installation instructions
```

## Backend Development

### 1. NestJS Module Structure

```typescript
// review.module.ts
@Module({
  imports: [
    TypeOrmModule.forFeature([Review, ReviewCategory]),
    ThirdPartyModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
```

### 2. Service Development

```typescript
// review.service.ts
@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
    private readonly thirdParty: ThirdPartyService
  ) {}

  async createReview(dto: CreateReviewDto): Promise<Review> {
    // Implementation
  }
}
```

### 3. Controller Development

```typescript
// review.controller.ts
@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.createReview(dto);
  }
}
```

### 4. Entity Development

```typescript
// review.entity.ts
@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  type: string;

  // ... other properties
}
```

### 5. Testing Backend

```bash
# Run unit tests
pnpm --filter backend test

# Run integration tests
pnpm --filter backend test:e2e

# Run tests with coverage
pnpm --filter backend test:cov
```

## Frontend Development

### 1. Component Development

```typescript
// components/ReviewCard.tsx
interface ReviewCardProps {
  review: Review;
  onApprove: (id: number) => void;
  onDisapprove: (id: number) => void;
}

export function ReviewCard({
  review,
  onApprove,
  onDisapprove,
}: ReviewCardProps) {
  return <div className="review-card">{/* Component implementation */}</div>;
}
```

### 2. Hook Development

```typescript
// hooks/useReviews.ts
export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
    staleTime: 5 * 60 * 1000,
  });
}
```

### 3. Page Development

```typescript
// app/dashboard/page.tsx
export default function Dashboard() {
  const { data: reviews, isLoading } = useReviews();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <MetricsCards reviews={reviews} />
      <Charts reviews={reviews} />
    </div>
  );
}
```

### 4. Testing Frontend

```bash
# Run unit tests
pnpm --filter frontend test

# Run component tests
pnpm --filter storybook test

# Run E2E tests
pnpm --filter frontend test:e2e
```

## Package Development

### 1. Shared Types

```typescript
// packages/types/src/common/review.model.ts
export interface Review {
  id: number;
  type: string;
  rating: number | null;
  // ... other properties
}
```

### 2. UI Components

```typescript
// packages/ui/src/forms/Button.tsx
interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
}: ButtonProps) {
  return (
    <button className={`btn btn-${variant} btn-${size}`}>{children}</button>
  );
}
```

### 3. Utilities

```typescript
// packages/utils/src/format.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US").format(date);
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
```

## Testing Strategy

### 1. Unit Tests

```typescript
// review.service.spec.ts
describe("ReviewService", () => {
  let service: ReviewService;
  let repository: Repository<Review>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Review),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it("should create a review", async () => {
    const dto = { type: "guest_review", rating: 4.5 };
    const result = await service.createReview(dto);
    expect(result).toBeDefined();
  });
});
```

### 2. Integration Tests

```typescript
// review.e2e-spec.ts
describe("Review (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/review (GET)", () => {
    return request(app.getHttpServer())
      .get("/review")
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toBeInstanceOf(Array);
      });
  });
});
```

### 3. Component Tests

```typescript
// ReviewCard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ReviewCard } from "./ReviewCard";

describe("ReviewCard", () => {
  it("renders review information", () => {
    const review = { id: 1, guestName: "John Doe", rating: 4.5 };
    render(
      <ReviewCard
        review={review}
        onApprove={jest.fn()}
        onDisapprove={jest.fn()}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });
});
```

## Debugging

### 1. Backend Debugging

```bash
# Start with debug mode
pnpm --filter backend start:debug

# Attach debugger in VS Code
# Use launch.json configuration
```

### 2. Frontend Debugging

```bash
# Start with debug mode
pnpm --filter frontend dev

# Use React DevTools
# Use Next.js debugging features
```

### 3. Database Debugging

```bash
# Connect to PostgreSQL
docker exec -it flex-living-db-1 psql -U postgres -d flex_living

# View logs
docker-compose logs -f db
```

## Performance Optimization

### 1. Backend Optimization

- **Database Indexing**: Add indexes for frequently queried columns
- **Query Optimization**: Use `EXPLAIN ANALYZE` for slow queries
- **Caching**: Implement Redis caching for expensive operations
- **Connection Pooling**: Configure database connection pooling

### 2. Frontend Optimization

- **Code Splitting**: Use dynamic imports for large components
- **Image Optimization**: Use Next.js Image component
- **Bundle Analysis**: Analyze bundle size with `@next/bundle-analyzer`
- **Memoization**: Use React.memo and useMemo for expensive calculations

## Common Issues and Solutions

### 1. Database Connection Issues

```bash
# Check if database is running
docker-compose ps

# Restart database
docker-compose restart db

# Check logs
docker-compose logs db
```

### 2. Port Conflicts

```bash
# Check what's using the port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 pnpm dev
```

### 3. Dependency Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

### 4. TypeScript Errors

```bash
# Check TypeScript configuration
pnpm tsc --noEmit

# Update types
pnpm --filter types build
```

## Code Review Guidelines

### 1. Review Checklist

- [ ] Code follows project conventions
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No console.log statements
- [ ] Error handling is implemented
- [ ] Performance considerations addressed

### 2. Review Process

1. **Self Review**: Review your own code before submitting
2. **Peer Review**: At least one team member reviews
3. **Automated Checks**: CI/CD pipeline runs tests
4. **Approval**: Required approval before merging

## Deployment

### 1. Development Deployment

```bash
# Build and start with Docker
docker-compose up --build

# Check logs
docker-compose logs -f
```

### 2. Production Deployment

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
```

## Resources

### Documentation Links

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeORM Documentation](https://typeorm.io/)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Tools and Extensions

- **VS Code Extensions**: ES7+ React/Redux/React-Native snippets, TypeScript Importer
- **Browser Extensions**: React Developer Tools, Redux DevTools
- **API Testing**: Postman, Insomnia
- **Database Management**: pgAdmin, DBeaver

---

_This development guide is maintained by the Flex Living development team. For questions or suggestions, please contact the team._
