declare global {
  namespace Express {
    interface Request {
      user: string;
      session: {
        jwt: string;
      } | null;
    }
  }
}
