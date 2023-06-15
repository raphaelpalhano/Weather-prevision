import { StormGlassService } from '@src/services/storm-glass.service';
import axios from 'axios';
import stormGlassWeather from '@test/core/fixture/static/storm-glass-weather.json';
import stormGlassNormalized from '@test/core/fixture/static/storm-glass-weather-normalize.json';

jest.mock('axios');

describe('StormGlass Client', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const sut = new StormGlassService(mockedAxios);

  it('should return the normalized forecast from the StormGlass service', async () => {
    //arrange
    const lat = -33.782773;
    const long = 151.2822942;

    mockedAxios.get.mockResolvedValue({ data: stormGlassWeather });

    // Act
    const response = await sut.fetchPoint(lat, long);

    // assert
    expect(response).toEqual(stormGlassNormalized);
  });

  it('should exclude incomplete data points', async () => {
    //arrange
    const lat = -33.782773;
    const long = 151.2822942;

    const incompleteResponse = {
      hours: [
        {
          winDirection: {
            noaa: 300,
          },
          time: '2023-03-25T00:00:00',
        },
      ],
    };

    mockedAxios.get.mockResolvedValue({ data: incompleteResponse });

    const response = await sut.fetchPoint(lat, long);

    expect(response).toEqual([]);
  });

  it('should get a generic error StormGlass service when the request fail before reaching the service', async () => {
    //arrange
    const lat = -33.782773;
    const long = 151.2822942;

    mockedAxios.get.mockRejectedValue({ message: 'Network Error' });

    await expect(sut.fetchPoint(lat, long)).rejects.toThrow(
      'Unexpected error when trying to communicate to StormGlass: Network Error',
    );
  });

  it('should get an StormGlassResponseError when service reached limite', async () => {
    //arrange
    const lat = -33.782773;
    const long = 151.2822942;

    mockedAxios.get.mockRejectedValue({
      response: {
        status: 429,
        data: { erros: ['Rate Limit reached'] },
      },
    });

    await expect(sut.fetchPoint(lat, long)).rejects.toThrow(
      'Unexpected error returned by the StormGlass service: Error: {"erros":["Rate Limit reached"]} Code: 429',
    );
  });
});
