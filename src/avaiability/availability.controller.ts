import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProviderRoles } from '../auth/decorators/provider-roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleProvider } from '../entities/enum';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityOverrideDto } from './dto/create-availability-override.dto';
import { GetAvailabilityDto } from './dto/get-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@ApiTags('Availability')
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) { }

  @Put('weekly')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ProviderRoles(RoleProvider.MANAGER, RoleProvider.COLLABORATOR)
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
    console.log('USER OBJECT NO CONTROLLER:', req.user);
    const userId = req.user.userId;
    return this.availabilityService.updateWeeklyAvailability(userId, updateDto);
  }

  @Post('overrides')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ProviderRoles(RoleProvider.MANAGER, RoleProvider.COLLABORATOR)
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
    const userId = req.user.userId;
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
