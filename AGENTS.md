# AGENTS.md

This file contains essential information for agentic coding agents working in this repository.

## Development Commands

### Build & Development

- `npm run dev` - Start development server with hot reload using nodemon
- `npm run build` - Compile TypeScript to JavaScript (outputs to `dist/`)
- `npm start` - Run production server from compiled JavaScript

### Testing

- `npm test` - Run all tests in watch mode with Jest
- `npm run test:ci` - Run tests once (non-watch mode)
- `npm run test:single <filename>` - Run a single test file: `npx jest __test__/User.test.ts --watch`

### Code Quality

- `npm run lint` - Run ESLint to check code style and potential issues
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier

## Project Structure

This is a Node.js/Express REST API with TypeScript using:

- **Express.js** as the web framework
- **MongoDB/Mongoose** for database operations
- **Firebase Admin** for authentication
- **Socket.io** for real-time communication
- **Cloudinary** for image storage

### Directory Layout

```
src/
├── controllers/    # Route handlers
├── services/       # Business logic
├── models/         # Mongoose schemas
├── routes/         # Express route definitions
├── middlewares/    # Express middleware
├── config/         # Configuration files
├── firebase/       # Firebase setup
├── utils/          # Utility functions
├── helpers/        # Helper functions
├── schemas/        # Validation schemas
└── types/          # TypeScript type definitions
```

## Code Style Guidelines

### TypeScript Configuration

- Target: ES2020
- Module: NodeNext
- Strict mode enabled
- Path aliases configured:
  - `@models/*` → `src/models/*`
  - `@controllers/*` → `src/controllers/*`
  - `@services/*` → `src/services/*`

### Import Patterns

```typescript
// External libraries first
import express from 'express';
import mongoose from 'mongoose';

// Internal modules with path aliases
import User from '@models/User';
import UserService from '@services/UserService';
import { Request, Response } from 'express';
```

### Naming Conventions

- **Files**: PascalCase for components/services (UserController.ts), camelCase for utilities (email.ts)
- **Classes**: PascalCase (UserService, UserController)
- **Functions/Methods**: camelCase (getUsers, addUser)
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE for environment variables (EMAIL, PORT)
- **Interfaces**: PascalCase with 'I' prefix (IUser)

### Error Handling Pattern

All service methods return objects with `error` and `data` properties:

```typescript
// Service layer
static async getUserById({ id }: { id: string }) {
  try {
    const user = await User.findById(id);
    return { error: false, data: user };
  } catch (error) {
    return { error: true, data: { message: 'User not found' } };
  }
}

// Controller layer
static async getUserById(req: Request, res: Response) {
  const { id } = req.params;
  const { error, data } = await UserService.getUserById({ id });

  if (error) return res.status(404).json(data);
  return res.status(200).json(data);
}
```

### Database Models

- Use Mongoose with TypeScript interfaces
- Include timestamps and disable versionKey
- Use proper ObjectId references
- Required fields should have `require: true`

```typescript
interface IUser {
  id: string;
  username: string;
  email: string;
  // ... other fields
}

const UserSchema = new Schema<IUser>(
  {
    id: { type: String, require: true, unique: true },
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
```

### Authentication

- Firebase Admin SDK for token verification
- Middleware pattern for protected routes
- Token extracted from `Authorization: Bearer <token>` header

```typescript
const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // ... verify token logic
};
```

### API Response Format

Consistent JSON responses:

```typescript
// Success
res.status(200).json(data);
res.status(201).json(data);

// Error
res.status(400).json({ message: 'Validation error' });
res.status(404).json({ message: 'Resource not found' });
res.status(409).json({ message: 'Conflict' });
```

### Validation

Use express-validator schemas located in `src/schemas/` for request validation.

### Testing

- Jest with ts-jest preset
- Test files in `__test__/` directory with `.test.ts` extension
- Use supertest for HTTP testing
- Test timeout: 100000ms
- Clean up data in `beforeAll` and `afterAll` hooks

## Environment Variables

Required environment variables should be defined in `.env`:

- `PORT` - Server port (default: 3000)
- `ORIGIN` - CORS origin
- `EMAIL` - Email for notifications
- Database connection string
- Firebase credentials
- Cloudinary credentials

## Firebase Integration

- Admin SDK initialized in `src/firebase/firebase-admin.ts`
- User authentication and management
- Token verification for API security

## Socket.io

Real-time features handled through SocketService located in `src/services/SocketService.ts`.
