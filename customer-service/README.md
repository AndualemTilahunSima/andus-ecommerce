# Customer Service - Clean Architecture with Sequelize

A Node.js microservice implementing Clean Architecture principles with Sequelize ORM, similar to Spring Boot patterns.

## 🏗️ Architecture Overview

This service follows Clean Architecture with hexagonal design and Sequelize ORM:

```
src/
├── config/           # Configuration and DI container
├── customer/         # Customer domain
│   ├── controller/   # HTTP controllers (presentation layer)
│   ├── service/      # Business logic (application layer)
│   ├── repository/   # Data access (infrastructure layer)
│   │   ├── CustomerRepository.js           # Repository interface
│   │   └── SequelizeCustomerRepository.js  # Sequelize implementation
│   ├── model/        # Domain entities & Sequelize models
│   │   ├── customer.js                     # Domain entity
│   │   └── CustomerModel.js                # Sequelize model
│   ├── dto/          # Data Transfer Objects
│   ├── error/        # Domain errors
│   ├── handler/      # Error handlers
│   └── routes/       # Route definitions
├── log/              # Logging utilities
└── db/               # Database migrations & seeders
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL (via Docker)

### Installation
```bash
# Install dependencies
npm install

# Create environment files
mkdir env
touch env/.env env/.env.staging env/.env.prod
```

### Environment Configuration

Create the following environment files with database configurations:

**env/.env (Development)**
```env
# Application Configuration
NODE_ENV=development
PORT=3001
LOG_LEVEL=debug

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=ecommerce_dev
```

**env/.env.staging**
```env
# Application Configuration
NODE_ENV=staging
PORT=3001
LOG_LEVEL=info

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=ecommerce_staging
```

**env/.env.prod**
```env
# Application Configuration
NODE_ENV=production
PORT=3001
LOG_LEVEL=warn

# Database Configuration
DB_HOST=your-production-host
DB_PORT=5432
DB_USER=your-production-user
DB_PASSWORD=your-production-password
DB_NAME=ecommerce_prod
```

### Database Setup

**Option 1: Using Docker (Recommended)**
```bash
# Start PostgreSQL
docker compose up -d postgres

# Run Sequelize migrations
npm run db:migrate

# Seed with demo data
npm run db:seed
```

**Option 2: Using Sequelize CLI**
```bash
# Create database
npx sequelize-cli db:create

# Run migrations
npm run db:migrate

# Seed data
npm run db:seed

# Reset database (drop, create, migrate, seed)
npm run db:reset
```

### Running the Service

**Development:**
```bash
npm run dev
```

**Staging:**
```bash
npm run staging
```

**Production:**
```bash
npm run prod
```

## 📚 API Documentation

### Customer Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/customer` | Create new customer |
| GET | `/api/customer` | Get all customers |
| GET | `/api/customer/active` | Get active customers |
| GET | `/api/customer/:id` | Get customer by ID |
| PATCH | `/api/customer/:id/address` | Update customer address |
| PATCH | `/api/customer/:id/email` | Update customer email |
| DELETE | `/api/customer/:id` | Delete customer |

### Request Examples

**Create Customer:**
```bash
curl -X POST http://localhost:3001/api/customer \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "address": "123 Main St"
  }'
```

**Get Customer by ID:**
```bash
curl http://localhost:3001/api/customer/{customer-id}
```

## 🏛️ Clean Architecture with Sequelize

### 1. Domain Layer (Core)
- **Models**: Business entities with encapsulated logic (`customer.js`)
- **Errors**: Domain-specific error types
- **Validation**: Business rules and constraints

### 2. Application Layer
- **Services**: Business logic orchestration (`CustomerService.js`)
- **DTOs**: Data transformation objects (`CreateCustomerDto.js`, `CustomerResponseDto.js`)
- **Use Cases**: Application-specific operations

### 3. Infrastructure Layer
- **Repository Interface**: Data access contract (`ICustomerRepository`)
- **Sequelize Repository**: PostgreSQL implementation (`SequelizeCustomerRepository.js`)
- **Sequelize Model**: Database mapping (`CustomerModel.js`)

### 4. Presentation Layer
- **Controllers**: HTTP request/response handling (`CustomerController.js`)
- **Routes**: API endpoint definitions (`CustomerRoutes.js`)
- **Middleware**: Cross-cutting concerns

## 🔧 Key Features

### Sequelize Integration
- **Repository Pattern**: Clean separation between domain and data access
- **Environment-specific Config**: Different database configs per environment
- **Migrations**: Version-controlled database schema changes
- **Seeders**: Demo data for development
- **Connection Pooling**: Optimized database connections
- **Validation**: Sequelize model validation + domain validation

### Database Configuration
- **Development**: Local PostgreSQL with logging enabled
- **Staging**: Local PostgreSQL with optimized pool settings
- **Production**: Remote PostgreSQL with SSL and high-performance pool

### Dependency Injection
- **Container**: Simple DI container for managing dependencies
- **Interface-based Design**: Repository interface for testability
- **Async Initialization**: Database connection testing on startup

### Error Handling
- **Centralized Error Handling**: Global error handler
- **Custom Domain Errors**: Business-specific error types
- **Sequelize Error Mapping**: Database errors to domain errors

### Logging
- **Structured Logging**: Winston with environment-specific formats
- **Request Context Tracking**: User and request information
- **Database Logging**: SQL queries in development

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## 🐳 Docker

### Build Image
```bash
docker build -t customer-service:latest .
```

### Run Container
```bash
docker run -p 3001:3001 \
  --env-file ./env/.env \
  customer-service:latest
```

### Docker Compose (Full Stack)
```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f customer-service
```

## 📦 Dependencies

### Production
- `express`: Web framework
- `winston`: Logging
- `zod`: Schema validation
- `helmet`: Security headers
- `cors`: Cross-origin resource sharing
- `compression`: Response compression
- `express-rate-limit`: Rate limiting
- `sequelize`: ORM
- `pg`: PostgreSQL driver
- `pg-hstore`: PostgreSQL hstore support

### Development
- `nodemon`: Development server
- `jest`: Testing framework
- `eslint`: Code linting
- `cross-env`: Cross-platform environment variables
- `sequelize-cli`: Database migrations and seeding

## 🔄 Database Commands

```bash
# Migration commands
npm run db:migrate      # Run pending migrations
npm run db:seed         # Seed database with demo data
npm run db:reset        # Reset database (drop, create, migrate, seed)

# Sequelize CLI commands
npx sequelize-cli db:create     # Create database
npx sequelize-cli db:drop       # Drop database
npx sequelize-cli migration:generate --name create-customers  # Generate migration
npx sequelize-cli seed:generate --name demo-customers        # Generate seeder
```

## 🎯 Best Practices Implemented

1. **Clean Architecture**: Clear layer boundaries with dependency inversion
2. **Repository Pattern**: Abstract data access with Sequelize implementation
3. **Environment Configuration**: Per-environment database settings
4. **Domain-Driven Design**: Rich domain models with business logic
5. **Error Handling**: Centralized error handling with domain errors
6. **Logging**: Structured logging with request context
7. **Validation**: Multiple layers of validation (DTO, Domain, Sequelize)
8. **Database Migrations**: Version-controlled schema changes
9. **Connection Pooling**: Optimized database connections per environment
10. **Async Initialization**: Database connection testing on startup

## 🚧 Future Enhancements

- [ ] Authentication & authorization
- [ ] API documentation with Swagger
- [ ] Event-driven architecture
- [ ] Circuit breaker pattern
- [ ] Health checks with database connectivity
- [ ] Metrics and monitoring
- [ ] Caching layer (Redis)
- [ ] Message queue integration
- [ ] Database read replicas
- [ ] Automated testing with test database

## 📝 License

ISC License
