export class EntityFieldError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EntityFieldError';
  }
}

export class RepositoryError extends Error {
  constructor(repoName: string, message: string, stack?) {
    super(message);
    this.name = 'RepositoryError.' + repoName;
    this.stack = stack;
  }
}

export class UserFieldError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserFieldError';
  }
}

export class SystemError extends Error {
  constructor(message?: string, stack?) {
    super(message);
    this.name = 'SystemError';
    this.message = message || 'System Error';
    this.stack = stack;
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
    this.message = message || 'Unauthorized';
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
    this.message = message || 'Forbidden';
  }
}
