import { CurrencyType } from '../../../../domain/entities/poster/enums';
import { Location } from '../../../../domain/entities/poster/Poster';

export interface RemovePoster {
  id: string;
}

export interface GetCategory {
  id: string;
}

export interface PosterCreate {
  title: string;
  description: string;
  price: number;
  exchange: boolean;
  currency: CurrencyType;
  used: boolean;
  location: Location;
  email: string;
  phoneNumber: string;
  agreement: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  additionalInformations: null | Object;
}
