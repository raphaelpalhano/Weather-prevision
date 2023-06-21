import { ForecastPoint } from '@src/core/domain/interfaces/forecast-point.interface';
import {
  StormGlassForecastResponse,
  StormGlassPoint,
} from '@src/core/domain/interfaces/storm-glass.interface';
import config, { IConfig } from 'config';
import * as RequestHelper from '@src/core/helper/request';
import { ClientRequestError } from '@src/common/errors/client-request.error';
import { StormGlassResponseError } from '@src/common/errors/storm-glass.error';

const stormGlassResourceConfig: IConfig = config.get(
  'App.Resources.StormGlass',
);

export class StormGlassService {
  private readonly stormGlassAPIParams =
    'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';
  private readonly stormGlassAPISource = 'noaa';
  constructor(protected request = new RequestHelper.Request()) {}

  public async fetchPoint(lat: number, long: number): Promise<ForecastPoint[]> {
    try {
      const response = await this.request.get<StormGlassForecastResponse>(
        `${stormGlassResourceConfig.get(
          'apiUrl',
        )}/weather/point?lat=${lat}&lng=${long}&params=${
          this.stormGlassAPIParams
        }&source=${this.stormGlassAPISource}`,
        {
          headers: {
            Authorization: stormGlassResourceConfig.get('apiToken'),
          },
        },
      );

      return this.normalizeResponse(response.data);
    } catch (err: any) {
      if (RequestHelper.Request.isRequestError(err)) {
        throw new StormGlassResponseError(
          `Error: ${JSON.stringify(err.response.data)} Code: ${
            err.response.status
          }`,
        );
      }
      // The type is temporary given we will rework it in the upcoming chapters
      throw new ClientRequestError(err.message);
    }
  }

  private normalizeResponse(
    points: StormGlassForecastResponse,
  ): ForecastPoint[] {
    return points.hours.filter(this.isValidPoint.bind(this)).map((point) => ({
      swellDirection: point.swellDirection[this.stormGlassAPISource],
      swellHeight: point.swellHeight[this.stormGlassAPISource],
      swellPeriod: point.swellPeriod[this.stormGlassAPISource],
      time: point.time,
      waveDirection: point.waveDirection[this.stormGlassAPISource],
      waveHeight: point.waveHeight[this.stormGlassAPISource],
      windDirection: point.windDirection[this.stormGlassAPISource],
      windSpeed: point.windSpeed[this.stormGlassAPISource],
    }));
  }

  private isValidPoint(point: Partial<StormGlassPoint>): boolean {
    return !!(
      point.time &&
      point.swellDirection?.[this.stormGlassAPISource] &&
      point.swellHeight?.[this.stormGlassAPISource] &&
      point.swellPeriod?.[this.stormGlassAPISource] &&
      point.waveDirection?.[this.stormGlassAPISource] &&
      point.waveHeight?.[this.stormGlassAPISource] &&
      point.windDirection?.[this.stormGlassAPISource] &&
      point.windSpeed?.[this.stormGlassAPISource]
    );
  }
}
