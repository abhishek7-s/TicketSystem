import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    @Inject(UserService) 
    private readonly userService: UserService, 
    private jwtService : JwtService
){}

 async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    try {
        const payload = this.jwtService.verify(token);
        const user = await this.userService.findById(payload.id);
  
        if (!user || user.isAdmin !== true) {
          throw new ForbiddenException('Access denied. Admins only.');
        }
        return true;
      } catch (error) {
        throw new ForbiddenException('Invalid or expired token');
      }
  }
}