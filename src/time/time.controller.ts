import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { TimeService } from './time.service';

@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  /**
   * Set time out for api with default of 3s
   */
  @Get(':time')
  @Public()
  async takeTime(
    @Param('time', new DefaultValuePipe(3), ParseIntPipe) time = 3,
  ) {
    const result = await this.timeService.takeTime(time);
    return result;
  }
}
