import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import forecast from '@test/core/fixture/static/forecast.json';

@Controller('forecast')
export class ForecastController {
  constructor(private readonly findForecast: any) {}

  @Get('')
  public async getForescastForLoggedUSer(req: Request, res: Response) {
    res.status(200).send(forecast);
  }
}
