import { RedisDB } from '../../infra/redis';
import { MemoryRepository } from '../../core/MemoryRepository';

export class AuthMemRepository extends MemoryRepository {
  constructor() {
    super();
    this.hashName = 'authSession';
  }
  private makeKey(userId: string, refreshToken: string): string {
    return `refresh-${refreshToken}.${this.hashName}.${userId}`;
  }
  async addToken(userId: string, refreshToken: string, token: string) {
    try {
      return await RedisDB.setWithExpire(this.makeKey(userId, refreshToken), token);
    } catch (e) {
      throw new Error(e);
    }
  }
  async getUserToken(userId: string) {
    try {
      const token = await RedisDB.getAllKeys(`refresh-*.${this.hashName}.*${userId}`);
      return token;
    } catch (e) {
      throw new Error(e);
    }
  }

  // async getTokensByRefreshToken(refreshToken: string) {
  //   try {
  //     const token = await RedisDB.getAllKeys(`refresh-${refreshToken}.${this.hashName}*`);
      
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }
  // async getTokens(username: string): Promise<string[]> {
  //   const keyValues = await RedisDB.getAllKeys(`*${this.hashName}.${username}`);
  //   return keyValues.map((kv: any) => kv.value);
  // }
}
