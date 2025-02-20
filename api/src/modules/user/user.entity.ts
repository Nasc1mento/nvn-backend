import { IsEmail, IsNotEmpty, MaxLength, Min, MinLength } from "class-validator";
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
    @Expose()
    @ApiProperty()
    @IsNotEmpty({message: 'Name is required'})
    @MinLength(3, {message: 'Name is too short'})
    @MaxLength(12, {message: 'Name is too long'})
    name: string;
    @Expose()
    @ApiProperty()
    @IsNotEmpty({message: 'Email is required'})
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsNotEmpty({message: 'Password is required'})
    @MinLength(8, {message: 'Password is too short'})
    @MaxLength(20, {message: 'Password is too long'})
    password: string;
}

export class UserLoginDto extends OmitType(UserEntity, ['id']) {}
export class UserRegisterDto extends OmitType(UserEntity, ['id']) {}
export class UserUpdateDto extends OmitType(PartialType(UserEntity), ['id','cpf']) {}