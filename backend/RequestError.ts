export class RequestError extends Error {
  title: string;
  errors: string[];
  status: number;

  constructor (title: string, message: string, status: number) {
    super(message);
    this.title = title;
    this.errors = [];
    this.status = status;
  }
}

export class ExtendedValidationError {
  title: string;
  errors: string[];

  constructor (title: string) {
    this.title = title;
  }
}
