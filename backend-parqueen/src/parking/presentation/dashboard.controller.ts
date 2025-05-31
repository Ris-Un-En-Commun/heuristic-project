import { Controller, Get } from '@nestjs/common';
import { GetDashboardStatsUseCase } from '../application/get-dashboard-stats.use-case';
import { DashboardStatsDto } from '../application/dto/dashboard-stats.dto';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly statsService: GetDashboardStatsUseCase) {}

  @Get('stats')
  async getStats(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<DashboardStatsDto> {
    if (!startDate || !endDate) {
      throw new BadRequestException('startDate and endDate query parameters are required');
    }
    return this.statsService.execute(startDate, endDate);
  }
}