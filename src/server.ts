import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import * as env from 'dotenv';
import { ForecastController } from './modules/forecast/application/controllers';
import { FindForecastUsecase } from './modules/forecast/application/use-cases';
import { Application } from 'express';
env.config({
  path: process.env.NODE_ENV === 'develop' ? '.env' : '.env.prod',
});

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public init(): void {
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.setupControllers();
  }

  private setupControllers(): void {
    const forecastController = new ForecastController(
      new FindForecastUsecase(),
    );
    this.addControllers([forecastController]);
  }

  public getApp(): Application {
    return this.app;
  }
}
