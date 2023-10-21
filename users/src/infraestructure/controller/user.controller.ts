import {
  Body,
  ConflictException,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse } from '@nestjs/swagger';

import { UserAlreadyExistsError } from '../../domain/exception';
import { USER_SERVICE, UserService } from '../service';
import { UserDTO } from 'src/utils';

@ApiTags('UserController')
@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
  ) {}

  /*
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiOkResponse({ type: UserDTO })
  async findAll(): Promise<UserDTO[] | null> {
    return null;
    
  }
    @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por id' })
  @ApiOkResponse({ type: UserDTO })
  async findOne(@Param('id') id: string): Promise<UserDTO | null> {
    try {
      const user: UserDTO = await this.userService.getUserById(id);
      if (user) this.logger.info(`User was found`, { id: id });
      return user;
    } catch (e) {
      if (e instanceof IdNotFoundError) {
        throw new NotFoundException('User not found');
      } else {
        throw catchError(e);
      }
    }
  }

  */

  @Post()
  @ApiOperation({ summary: 'Crear un usuario' })
  @ApiBody({ type: UserDTO })
  @ApiOkResponse({ type: UserDTO })
  async create(@Body() userDto: UserDTO): Promise<UserDTO> {
    try {
      return await this.userService.createUser(userDto);
    } catch (e) {
      if (e instanceof UserAlreadyExistsError) {
        throw new ConflictException(e.message);
      } else {
        throw e;
      }
    }
  }

  /*
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por id' })
  @ApiOkResponse({ type: UserId })
  async delete(@Param('id') id: string): Promise<UserDeleteResponse> {
    try {
      await this.userService.deleteUser(UserId.with(id));
      return {
        id: id,
        message: 'User deleted'
      };
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException('User not found');
      } else {
        throw catchError(e);
      }
    }
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<TokenResponse> {
    const { email, password } = loginDTO;

    const user: UserDTO = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Login failed');
    }

    const isValidPassword = await this.authService.validatePassword(
      password,
      user.password
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Login failed');
    }

    return new TokenResponse(await this.authService.generateToken(user.id));
  }

  @Post('validate-token')
  @ApiOperation({ summary: 'Validar el token del usuario' })
  @ApiBody({ type: TokenResponse })
  async validateToken(@Body() token: TokenResponse): Promise<RoleResponse> {
    const userId: UserId = await this.authService.validateToken(token.token);

    if (!userId) {
      throw new UnauthorizedException('Invalid token');
    }

    return new RoleResponse(
      (await this.userService.getUserById(userId.value)).role,
      userId.value
    );
  }

  @Post('change-password')
  @ApiOperation({ summary: 'Cambiar la contraseña del usuario' })
  @ApiOkResponse({ type: ChangePasswordRequestDTO })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordRequestDTO
  ): Promise<ChangePasswordResponse> {
    const { token, password, newpassword } = changePasswordDto;
    try {
      const userId: UserId = await this.authService.validateToken(token);
      const user: UserDTO = await this.userService.getUserById(userId.value);
      const isValidPassword = await this.authService.validatePassword(
        password,
        user.password
      );

      if (!isValidPassword) {
        throw new ForbiddenException('Contraseña incorrecta');
      }

      const newHashedPassword = await this.authService.hashPassword(
        newpassword
      );
      await this.userService.updateUserPassword(userId, newHashedPassword);
    } catch (e) {
      if (e instanceof ForbiddenException) {
        throw e;
      } else {
        throw new UnauthorizedException(e.message);
      }
    }
    return {
      token: token,
      message: 'Contraseña cambiada correctamente'
    };
  }
  */
}
