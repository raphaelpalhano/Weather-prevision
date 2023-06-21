import { BeachForecast } from '@src/core/domain/interfaces/beach-forest.interface';
import { Beach } from '@src/core/domain/interfaces/beach.interface';
import { StormGlassService } from '@src/services/storm-glass.service';

export class ForecastBeachesUseCase {
  constructor(protected stormGlassService = new StormGlassService()) {}

  public async execute(beaches: Beach[]): Promise<BeachForecast[]> {
    const pointsWithCorrectSources: BeachForecast[] = [];
    for (const beach of beaches) {
      const points = await this.stormGlassService.fetchPoint(
        beach.lat,
        beach.lng,
      );
      const enrichedBeachData = points.map((e) => ({
        ...{},
        ...{
          lat: beach.lat,
          lng: beach.lng,
          name: beach.name,
          position: beach.position,
          rating: 1, //need to be implemented
        },
        ...e,
      }));

      pointsWithCorrectSources.push(...enrichedBeachData);
    }

    return pointsWithCorrectSources;
  }
}
