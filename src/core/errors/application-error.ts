interface IErrorDetail {
  path: Array<string | number>;
  message: string;
}

class ApplicationError extends Error {
  public readonly code: number;
  public readonly details: IErrorDetail[];

  constructor(options: { code: number; message: string; details: IErrorDetail[] }) {
    super(options.message);
    this.code = options.code;
    this.details = options.details;
  }
}

export { ApplicationError, IErrorDetail };
