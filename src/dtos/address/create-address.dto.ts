import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateAddressDTO {
  @IsString()
  @IsNotEmpty({ message: 'Street name must not be empty' })
  @Length(3, 255)
  publicPlace: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 45)
  houseNumber: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  state: string;
}
