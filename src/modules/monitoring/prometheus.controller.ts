import { Controller, Get, Res } from '@nestjs/common';
import { register } from './metrics';
import { Response } from 'express';

@Controller('metrics')
export class PrometheusController {
  @Get()
  async getMetrics(@Res() res: Response) {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
  }
}
