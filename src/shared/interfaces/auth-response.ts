import { Profile } from '@shared/interfaces/profile';
import { User } from './user';

/**
 * Authentication response
 */
export interface AuthResponse {
  readonly token: string;
  readonly user: User;
  readonly profiles: Profile[];
}
