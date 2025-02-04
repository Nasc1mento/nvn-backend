import { BadRequestException, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { User, UserDocument } from "../user/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserEntity, UserLoginDto, UserRegisterDto } from "../user/user.entity";
import { JwtService } from "@nestjs/jwt";
import { plainToInstance } from "class-transformer";


@Injectable({scope: Scope.REQUEST})
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(entity: UserLoginDto): Promise<{ token: string, user: UserEntity }> {
        const user = await this.userModel.findOne({ cpf: entity.cpf });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        
        const isValidPassword = await user.comparePassword(entity.password);
        if (!isValidPassword) {
            throw new BadRequestException('Invalid password');
        }

        return {
            token: this.jwtService.sign({ id: user._id }),
            user: plainToInstance(UserEntity, user),
        };
    }

    async signUp(entity: UserRegisterDto): Promise<UserEntity> {
        const user = await this.userModel.findOne({ cpf: entity.cpf });
        if (user) {
            throw new BadRequestException('User already exists');
        }
        
        return plainToInstance(UserEntity, await this.userModel.create(entity));
    }
}