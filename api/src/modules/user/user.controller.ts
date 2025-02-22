import { Body, Controller, Delete, Get, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserId } from "./userIdFromToken.decorator";
import { UserDTO, UserUpdateDTO } from "./user.dto";


@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @ApiOkResponse({ description: 'User profile'})
    @ApiNotFoundResponse({ description: 'User not found' })
    @Get('profile')
    async getProfile(@UserId() userId: string): Promise<UserDTO> {
        return this.userService.getUserById(userId);
    }

    @ApiOkResponse({ description: 'User updated' })
    @ApiNotFoundResponse({ description: 'User not found' })
    @Put('profile')
    async updateProfile(@UserId() userId: string,@Body() user: UserUpdateDTO): Promise<UserDTO> {
        return this.userService.updateUserById(userId, user);
    }

    @ApiOkResponse({ description: 'User deleted' })
    @ApiNotFoundResponse({ description: 'User not found' })
    @Delete('profile')
    async deleteProfile(@UserId() userId: string): Promise<any> {
        return this.userService.deleteUserById(userId);
    }
}