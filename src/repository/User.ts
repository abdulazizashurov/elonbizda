import User from '../infra/mongo/models/User';

export class UserRepository {
  async create(dataSource) {
    const record = await User.create(dataSource);
    record.password = null; // TODO: need refactor this
    return record;
  }

  async verifyUser(dataSource) {
    const user = await User.findOneAndUpdate({ verificationCode: dataSource }, { verified: true }, { new: true });
    return user;
  }

  async register(dataSource) {
    const user = await User.create(dataSource);
    return user;
  }

  async findByPhoneNumber(phoneNumber: string) {
    return await (await User.findOne({ phoneNumber })).toObject();
  }

  async findByEmail(email: string) {
    return await User.findOne({ email });
  }
}
