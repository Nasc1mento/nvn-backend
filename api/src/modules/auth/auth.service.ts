import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { User, UserDocument } from "../user/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { plainToInstance } from "class-transformer";
import { SignInDTO, SignUpDTO, UserDTO } from "../user/user.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";


@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
        @Inject(CACHE_MANAGER)
        private readonly cache: Cache
    ) {}

    async signIn(entity: SignInDTO): Promise<{ token: string, user: UserDTO }> {
        
        const user = await this.userModel.findOne({ cpf: entity.cpf });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        
        const isValidPassword = await user.comparePassword(entity.password);
        if (!isValidPassword) {
            throw new BadRequestException('Invalid password');
        }

        const token = this.jwtService.sign({ id: user.id });
        await this.cache.set(user.id, token, 3600);

        return {
            token,
            user: plainToInstance(UserDTO, user),
        };
    }

    async signUp(entity: SignUpDTO): Promise<UserDTO> {
        const user = await this.userModel.findOne({ cpf: entity.cpf });
        if (user) {
            throw new BadRequestException('User already exists');
        }

        return plainToInstance(UserDTO, await this.userModel.create(entity));
    }

    async logout(userId: string) {
        await this.cache.del(userId);
        return {
            message: "Logout successfully"
        }
    }
    
}