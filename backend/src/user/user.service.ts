import { ForbiddenException, Injectable, Req } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ){}

  findAll() {
    return this.userModel.findAll();
  }

  async userInfo(userId){
    const info = await this.userModel.findByPk(userId)
    if (!info) {
      return "user Not found"
    }
    return info
  }

  async me(id){
    const info = await this.userModel.findByPk(id)
    if (!info) {
      return "user Not found"
    }
    return info
  }

  async findById(id) {
    return this.userModel.findOne({where:{id : id}});
  }

  

}
