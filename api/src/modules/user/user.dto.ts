import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { IsValidCPF } from "./userCpfValidation.decorator";
import { Expose } from "class-transformer";

export class UserDTO {
    @Expose()
    readonly cpf: string;

    @Expose()
    readonly name: string;

    @Expose()
    readonly email: string;
}

export class SignInDTO {
    @IsValidCPF({message: "Invalid CPF"})
    readonly cpf: string;

    @MinLength(8)
    @MaxLength(25)
    readonly password:string;
}

export class SignUpDTO {
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    readonly name: string;

    @IsValidCPF({message: "Invalid CPF"})
    readonly cpf: string;

    @IsEmail()
    readonly email:string;

    @MinLength(8)
    @MaxLength(20)
    readonly password: string;
}

export class UserUpdateDTO {
    @IsOptional()
    @IsValidCPF()
    readonly cpf?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    readonly name?: string;

    @IsOptional()
    @IsEmail()
    readonly email?: string;

    @IsOptional()
    @MinLength(8)
    @MaxLength(20)
    readonly password?: string;
}