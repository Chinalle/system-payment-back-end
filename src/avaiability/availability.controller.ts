import {
  Controller,
  Put,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AvailabilityService } from './availability.service';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { CreateAvailabilityOverrideDto } from './dto/create-availability-override.dto';
import { GetAvailabilityDto } from './dto/get-availability.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import { RolesGuard } from '../auth/guards/roles.guard'; 
import { Roles } from '../auth/decorators/roles.decorator'; 
import { Role } from '../entities/enum'; 

@ApiTags('Availability')
@Controller('availability') 
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Put('weekly') 
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PROVIDER) 
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update provider's standard weekly availability" })
  @ApiOkResponse({ description: 'Weekly availability updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  async updateWeeklyAvailability(
    @Request() req: any,
    @Body() updateDto: UpdateAvailabilityDto,
  ) {
    const userId = req.user.id;
    return this.availabilityService.updateWeeklyAvailability(userId, updateDto);
  }

  @Post('overrides') 
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PROVIDER)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create or update an availability override (holiday, block)' })
  @ApiCreatedResponse({ description: 'Availability override saved successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  async createOrUpdateOverride(
    @Request() req: any,
    @Body() overrideDto: CreateAvailabilityOverrideDto, 
  ) {
    const userId = req.user.id;
    return this.availabilityService.createOrUpdateOverride(userId, overrideDto);
  }

  @Get('slots') 
  @ApiOperation({ summary: 'Get available time slots for booking' })
  @ApiOkResponse({ description: 'Returns available slots per day.' })
  @ApiBadRequestResponse({ description: 'Invalid query parameters.' })
  async getAvailability(@Query() queryDto: GetAvailabilityDto) { 
    return this.availabilityService.getAvailability(queryDto);
  }
}
