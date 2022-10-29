# Express typescript boilerplate

This is powerfull Express wrapper!

## Features:

- TypeScript
- [Pretty error handling](#error-handling)
- [Async handlers](#why-async-handlers)
- [TypeScript request body validation](#validation)

## Error handling

```typescript
import { asyncHandler, Exception } from "@lib";

export const signin = asyncHandler(async (req, res) => {
  if (!req.body.user) {
    throw Exception.badRequest("user must be provided");
  }
});
```

## Why async handlers?

if we use asyncHandlers we shouldn't use try/catch for catching error and sending this to error hendler middleware.

## Validation

We are using [class-validator](https://github.com/typestack/class-validator) for validation.

### Example

```typescript
// dto:
import { IsNotEmpty, IsEmail } from "class-validator";

export class AuthDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}

//route
import { validateBody } from "@lib";
import { AuthDto } from "./dto/auth.dto";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(AuthDto), signup);
```
