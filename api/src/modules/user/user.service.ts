import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.schema";
import { Model } from "mongoose";
import { UserEntity, UserUpdateDto } from "./user.entity";
import { NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";


export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ){}

    async getUserById(userId: string) {
        return plainToInstance(UserEntity, await this.userModel.findById(userId));
    }

    async updateUserById(userId: string, user: UserUpdateDto) {
        const userExists = await this.userModel.findById(userId);
        if (!userExists) {
            throw new NotFoundException('User not found');
        }

        Object.assign(userExists, user);
        return userExists.save();
    }

    async deleteUserById(userId: string) {
        const userExists = await this.userModel.findById(userId);
        if (!userExists) {
            throw new NotFoundException('User not found');
        }

        return userExists.deleteOne();
    }
}