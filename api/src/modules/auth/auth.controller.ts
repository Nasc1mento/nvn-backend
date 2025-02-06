import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserEntity, UserLoginDto, UserRegisterDto } from "../user/user.entity";
import { Public } from "./guard/publicRoute.decorator";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";


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
    async login(@Body() body: UserLoginDto): Promise<{ token: string, user: UserEntity }> {
        return this.authService.signIn(body);
    }

    @ApiCreatedResponse({ description: 'User registered' })
    @ApiConflictResponse({ description: 'User already exists' })
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    @Public()
    async register(@Body() body: UserRegisterDto): Promise<UserEntity> {
        return this.authService.signUp(body);
    }
}