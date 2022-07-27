import { RedisClientType } from 'redis';
import ApplicationContainer from '../../app';

export class RedisDB {
  static async create(key: string, value: string) {
    const connection: RedisClientType = await ApplicationContainer.resolve('redis').connection();
    return await connection.set(key, value);
  }

  static async setWithExpire(key: string, val: any, ttl?: number): Promise<any> {
    const connection: RedisClientType = await ApplicationContainer.resolve('redis').connection();
    const exTime = ttl || (await ApplicationContainer.resolve('config').redis.expireTime);

    try {
      await connection.set(key, val);

      await connection.expire(key, exTime);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async count(key: string): Promise<number> {
    const allKeys = await RedisDB.getAllKeys(key);
    return allKeys.length;
  }

  static async getOne(key: string) {
    const connection: RedisClientType = await ApplicationContainer.resolve('redis').connection();

    const data = await connection.get(key);
    return data;
  }
  static async getAllKeys(willcard: string): Promise<string[]> {
    const connection: RedisClientType = await ApplicationContainer.resolve('redis').connection();
    return connection.keys(willcard);
  }
}
