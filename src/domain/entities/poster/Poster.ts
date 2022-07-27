import { CurrencyType } from './enums';

type LocationMap = {
  lon: string;
  lat: string;
};

export type Location = {
  map: LocationMap;
  address: string;
};

export type Poster = {
  id: string;
  title: string;
  description: string;
  price: number; // Agar product tekin bo'lsa 0 bo'ladi.
  exchange: boolean;
  currency: CurrencyType; // usd | rub | uzs
  used: boolean; // ishlatilgan bo'lsa true bo'ladi
  location: Location;
  email: string; // default user email
  phoneNumber: string; // default user phoneNumber
  agreement: boolean; // elon joylaganda berilgan rozilik
  // eslint-disable-next-line @typescript-eslint/ban-types
  additionalInformations: null | Object; // category formga kiritilgan ma'lumotlar uchun joy
  publishedAt: Date; // elon qilingan sana
  isActive: boolean; // elon verify bo'lganidan keyingina ushbu field true bo'ladi va clientga ko'rinadi
  views: number; // ko'rilganlar soni
};
