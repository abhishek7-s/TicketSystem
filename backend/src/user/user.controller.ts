import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('/info/:id')
  eventInfo(@Param('id', ParseIntPipe) userId: number){
    return this.userService.userInfo(userId);
  }

  @Get('/me')
  me(@Req() req){
    return this.userService.userInfo(req.user.id);
  }
}
