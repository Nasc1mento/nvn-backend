import { BadRequestException, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { User, UserDocument } from "../user/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { plainToInstance } from "class-transformer";
import { SignInDTO, SignUpDTO, UserDTO } from "../user/user.dto";


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
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

        return {
            token: this.jwtService.sign({ id: user.id }),
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
}