import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dto/user.dto';
import { loginUser } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  helloAuth(){
    return this.authService.helloWorld()
  }

  @Post('/signup')
  signup(@Body() data : UserDto): Promise<any>{
    return this.authService.signup(data)
  }

  @Post('/signin')
  signin(@Body() data: loginUser):Promise<any>{
     return this.authService.signin(data)
  }

}
