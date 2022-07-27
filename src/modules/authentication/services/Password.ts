import { Password } from '../../user/services/Password';

export class PassworService {
  private passswordService: Password;
  constructor() {
    this.passswordService = new Password();
  }
  compare(password, hashedPassword) {
    return this.passswordService.compare(password, hashedPassword);
  }
}
