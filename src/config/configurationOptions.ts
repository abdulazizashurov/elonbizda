type HttpOptions = {
  port: number;
};

type JWTOptions = {
  secret: string;
  expires: string;
};

type ApplicationOptions = {
  http: HttpOptions;
  jwt: JWTOptions;
};

type MongoDBOptions = {
  auth: boolean;
  port: number;
  user: string;
  password: string;
  database: string;
  host: string;
};

type RedisOptions = {
  auth: boolean;
  port: number;
  user: string;
  password: string;
  database: string;
  host: string;
  expireTime: number;
};

type PlaymobileSMS = {
  token: string;
  host: string;
};
type Services = {
  playmobile: PlaymobileSMS;
};

export type ConfigurationOptions = {
  application: ApplicationOptions;
  mongodb: MongoDBOptions;
  redis: RedisOptions;
  services: Services;
};
