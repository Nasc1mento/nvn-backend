import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./guard/publicRoute.decorator";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { SignInDTO, SignUpDTO, UserDTO } from "../user/user.dto";
import { UserId } from "../user/userIdFromToken.decorator";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @ApiOkResponse({ description: 'User logged in' })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiBadRequestResponse({ description: 'Invalid password' })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    async login(@Body() body: SignInDTO): Promise<{ token: string, user: UserDTO }> {
        return this.authService.signIn(body);
    }

    @ApiCreatedResponse({ description: 'User registered' })
    @ApiConflictResponse({ description: 'User already exists' })
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    @Public()
    async register(@Body() body: SignUpDTO): Promise<UserDTO> {
        return this.authService.signUp(body);
    }


    @ApiNoContentResponse({ description: 'User logged out'})
    async logout(@UserId() userId: string) {
        return this.authService.logout(userId);
    }
}