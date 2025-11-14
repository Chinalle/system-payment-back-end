import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Query
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger';
import { ServicePricing } from 'src/entities/service-pricing.entity';
import { CreateServicePricingDto } from './create-service-pricing.dto';
import { ServicePricingService } from './service-pricing.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // descomentar para proteger

@ApiTags('Service Pricing')
@Controller('service-pricing')
// @UseGuards(JwtAuthGuard) // // descomentar para proteger
// @ApiBearerAuth() // // descomentar para proteger
export class ServicePricingController {
    constructor(
        private readonly pricingService: ServicePricingService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new pricing option for a service' })
    @ApiCreatedResponse({
        description: 'The pricing option was created successfully.',
        type: ServicePricing,
    })
    @ApiBadRequestResponse({ description: 'Invalid data provided.' })
    @ApiNotFoundResponse({ description: 'Parent service not found.' })
    create(
        @Headers('X-Company-ID') companyId: string,
        @Body() createDto: CreateServicePricingDto,
    ): Promise<ServicePricing> {
        return this.pricingService.create(createDto, companyId);
    }

    @Get()
    @ApiOperation({
        summary: 'List all pricing options',
        description: 'Optionally, filter by a specific serviceId using a query parameter.',
    })
    @ApiOkResponse({
        description: 'A list of pricing options.',
        type: [ServicePricing],
    })
    @ApiNotFoundResponse({ description: 'Parent service not found (if filtering).' })
    findAll(
        @Headers('X-Company-ID') companyId: string,
        @Query('serviceId', new ParseUUIDPipe({ optional: true }))
        serviceId?: string,
    ): Promise<ServicePricing[]> {
        if (serviceId) {
            return this.pricingService.findAllByServiceId(serviceId, companyId);
        }
        return this.pricingService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific pricing option by its ID' })
    @ApiOkResponse({
        description: 'The pricing option found.',
        type: ServicePricing,
    })
    @ApiNotFoundResponse({ description: 'Pricing option not found.' })
    findById(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ServicePricing> {
        return this.pricingService.findById(id);
    }
}