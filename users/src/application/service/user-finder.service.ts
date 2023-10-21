import { UserDTO } from 'src/utils';
import { UserEmail, UserId } from '../../domain/model';

export const USER_FINDER = 'USER_FINDER';

export interface UserFinder {
  findAll(): Promise<UserDTO[]>;
  findByEmail(email: UserEmail): Promise<UserDTO | null>;
  findById(id: UserId): Promise<UserDTO | null>;
}
