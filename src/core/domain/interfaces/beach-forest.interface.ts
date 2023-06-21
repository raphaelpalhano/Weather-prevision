import { Beach } from './beach.interface';
import { ForecastPoint } from './forecast-point.interface';

export interface BeachForecast extends Omit<Beach, 'user'>, ForecastPoint {}
