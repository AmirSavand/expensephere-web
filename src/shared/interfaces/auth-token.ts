/**
 * Parsed authentication token (JTW)
 */
export interface AuthToken {
  readonly email: string;
  readonly exp: number;
  readonly orig_iat: number;
  readonly user_id: string;
  readonly username: string;
}
