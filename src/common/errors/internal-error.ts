export class InternalError extends Error {
  constructor(
    public notification: string,
    protected status: number = 500,
    protected description?: string,
  ) {
    super(notification);
    this.name = 'Internal_Server_Error';
    Error.captureStackTrace(this, this.constructor);
  }
}
