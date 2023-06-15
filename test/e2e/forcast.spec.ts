import forecastResponse from '@test/core/fixture/static/forecast.json';

describe('Beach forecast functional tests', () => {
  it('should return a forecast with just a few times', async () => {
    // act
    const { body, status } = await global.testRequest.get('/forecast');

    //assert
    expect(status).toBe(200);
    expect(body).toEqual(forecastResponse);
  });
});
