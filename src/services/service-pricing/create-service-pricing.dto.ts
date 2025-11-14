import { ApiProperty } from '@nestjs/swagger';
import {
    IsInt,
    IsNotEmpty,
    IsString,
    IsUUID,
    Min,
} from 'class-validator';

export class CreateServicePricingDto {
    @ApiProperty({
        description: 'ID do serviço (da tabela services) ao qual este preço pertence',
        example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    })
    @IsUUID()
    @IsNotEmpty()
    serviceId: string;

    @ApiProperty({
        description: 'Nome desta opção de preço (ex: "Corte Simples")',
        example: 'Corte Simples',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Descrição detalhada desta opção de preço',
        example: 'Corte rápido com máquina e tesoura.',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Preço em centavos (ex: 2500 = R$ 25,00)',
        example: 2500,
    })
    @IsInt()
    @Min(0)
    priceInCents: number;

    @ApiProperty({
        description: 'Duração estimada em minutos',
        example: 30,
    })
    @IsInt()
    @Min(1)
    durationInMinutes: number;
}