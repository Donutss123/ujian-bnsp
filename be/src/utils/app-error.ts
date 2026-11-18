
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);

    this.name = "AppError";

    // Memperbaiki prototype inheritance
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
