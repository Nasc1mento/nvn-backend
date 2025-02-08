import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { IsValidCPF } from "./userCpfValidation.decorator";
import { User } from "./user.schema";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class UserEntity implements User {
    @Expose()
    @ApiProperty()
    id?: string;
    @ApiProperty()
    @IsNotEmpty({message: 'CPF is required'})
    @IsValidCPF({message: 'Invalid CPF'})
    @Expose()
    cpf: string;
    @ApiProperty()
    @IsNotEmpty({message: 'The password is required'})
    @MinLength(8, {message: 'The password is too short'})
    @MaxLength(20, {message: 'The password is too long'})
    password: string;
}

export class UserLoginDto extends OmitType(UserEntity, ['id']) {}
export class UserRegisterDto extends OmitType(UserEntity, ['id']) {}
export class UserUpdateDto extends OmitType(PartialType(UserEntity), ['id','cpf']) {}