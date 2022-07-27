import { UserRepository } from '../../../repository/User';

export class User {
  private repository: UserRepository;
  constructor() {
    this.repository = new UserRepository();
  }
  async findByPhoneNumber(phoneNumber: string) {
    try {
      return await this.repository.findByPhoneNumber(phoneNumber);
    } catch (e) {
      throw new Error(e);
    }
  }
}
