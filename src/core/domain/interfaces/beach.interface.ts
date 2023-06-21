import { BeachPosition } from '../enums/positions.enum';

export interface Beach {
  lat: number;
  lng: number;
  name: string;
  position: BeachPosition;
  user: string;
}
