import forescastBeach from '@test/core/fixture/static/forecast-beach.json';
import stormGlassNormalized from '@test/core/fixture/static/storm-glass-weather-normalize.json';
import { StormGlassService } from '@src/services/storm-glass.service';
import { ForecastBeachesUseCase } from '@src/modules/forecast/application/use-cases';
import { Beach } from '@src/core/domain/interfaces/beach.interface';
import { BeachPosition } from '@src/core/domain/enums/positions.enum';

jest.mock('@src/services/storm-glass.service');

describe('Forecast usecase', () => {
  it('should return the forecast for a list of mountais', async () => {
    StormGlassService.prototype.fetchPoint = jest
      .fn()
      .mockResolvedValue(stormGlassNormalized);

    const beaches: Beach[] = [
      {
        lat: -33.792726,
        lng: 151.289824,
        position: BeachPosition.E,
        name: 'Manly',
        user: 'some-id',
      },
    ];
    const expectedResponse = forescastBeach;

    const forecast = new ForecastBeachesUseCase(new StormGlassService());
    const beachesWithRating = await forecast.execute(beaches);
    expect(beachesWithRating).toEqual(expectedResponse);
  });
});
