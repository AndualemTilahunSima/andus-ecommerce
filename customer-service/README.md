# Customer Service - Clean Architecture

A Node.js microservice implementing Clean Architecture principles similar to Spring Boot patterns.

## 🏗️ Architecture Overview

This service follows Clean Architecture with hexagonal design:

```
src/
├── config/           # Configuration and DI container
├── customer/         # Customer domain
│   ├── controller/   # HTTP controllers (presentation layer)
│   ├── service/      # Business logic (application layer)
│   ├── repository/   # Data access (infrastructure layer)
│   ├── model/        # Domain entities
│   ├── dto/          # Data Transfer Objects
│   ├── error/        # Domain errors
│   ├── handler/      # Error handlers
│   └── routes/       # Route definitions
├── log/              # Logging utilities
└── db/               # Database migrations
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
Create the following environment files:

**env/.env (Development)**
```env
NODE_ENV=development
PORT=3001
LOG_LEVEL=debug
```

**env/.env.staging**
```env
NODE_ENV=staging
PORT=3001
LOG_LEVEL=info
```

**env/.env.prod**
```env
NODE_ENV=production
PORT=3001
LOG_LEVEL=warn
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

### Database Setup
```bash
# Start PostgreSQL
docker compose up -d postgres

# Run migrations
npm run migrate
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

## 🏛️ Clean Architecture Layers

### 1. Domain Layer (Core)
- **Models**: Business entities with encapsulated logic
- **Errors**: Domain-specific error types
- **Validation**: Business rules and constraints

### 2. Application Layer
- **Services**: Business logic orchestration
- **DTOs**: Data transformation objects
- **Use Cases**: Application-specific operations

### 3. Infrastructure Layer
- **Repositories**: Data access abstractions
- **Database**: Persistence implementations
- **External Services**: Third-party integrations

### 4. Presentation Layer
- **Controllers**: HTTP request/response handling
- **Routes**: API endpoint definitions
- **Middleware**: Cross-cutting concerns

## 🔧 Key Features

### Dependency Injection
- Simple DI container for managing dependencies
- Interface-based design for testability
- Repository pattern for data access

### Error Handling
- Centralized error handling
- Custom domain errors
- Consistent error responses

### Logging
- Structured logging with Winston
- Request context tracking
- Environment-specific log formats

### Validation
- DTO-based input validation
- Domain model validation
- Custom error messages

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

## 📦 Dependencies

### Production
- `express`: Web framework
- `winston`: Logging
- `zod`: Schema validation
- `helmet`: Security headers
- `cors`: Cross-origin resource sharing
- `compression`: Response compression
- `express-rate-limit`: Rate limiting

### Development
- `nodemon`: Development server
- `jest`: Testing framework
- `eslint`: Code linting
- `cross-env`: Cross-platform environment variables

## 🔄 Migration from Old Structure

The old structure has been refactored to follow clean architecture:

| Old | New |
|-----|-----|
| `contract/customer-request.js` | `dto/CreateCustomerDto.js` |
| `service/customer-service.js` | `service/CustomerService.js` |
| `repository/customer-repository.js` | `repository/CustomerRepository.js` |
| `controller/customer-controller.js` | `controller/CustomerController.js` |
| `customer-route.js` | `routes/CustomerRoutes.js` |

## 🎯 Best Practices Implemented

1. **Separation of Concerns**: Clear layer boundaries
2. **Dependency Inversion**: Interfaces over implementations
3. **Single Responsibility**: Each class has one reason to change
4. **Open/Closed Principle**: Extensible without modification
5. **Interface Segregation**: Focused interfaces
6. **Dependency Injection**: Inverted control of dependencies

## 🚧 Future Enhancements

- [ ] PostgreSQL repository implementation
- [ ] Authentication & authorization
- [ ] API documentation with Swagger
- [ ] Event-driven architecture
- [ ] Circuit breaker pattern
- [ ] Health checks with database connectivity
- [ ] Metrics and monitoring
- [ ] Caching layer
- [ ] Message queue integration

## 📝 License

ISC License
