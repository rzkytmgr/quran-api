import { ZodIssueBase } from 'zod';

class ErrorHandler extends Error {
  public code: number;
  public details: ZodIssueBase[];
  constructor(options: { code: number; message: string; details: ZodIssueBase[]; }) {
    super();
    this.message = options.message;
    this.code = options.code;
    this.details = options.details;
  }
}

export { ErrorHandler };
