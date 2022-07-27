import { User } from '../../user/services/User';

export class UserService {
  private externalUserService: User;
  constructor() {
    this.externalUserService = new User();
  }

  findByPhoneNumber(phoneNumber: string) {
    return this.externalUserService.findByPhoneNumber(phoneNumber);
  }
}
