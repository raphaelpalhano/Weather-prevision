import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { FindForecastUsecase } from '../use-cases/find-forecast.usecase';
import forecast from '@test/core/fixture/static/forecast.json';

@Controller('forecast')
export class ForecastController {
  constructor(private readonly findForecast: FindForecastUsecase) {}

  @Get('')
  public async getForescastForLoggedUSer(req: Request, res: Response) {
    res.status(200).send(forecast);
  }
}
