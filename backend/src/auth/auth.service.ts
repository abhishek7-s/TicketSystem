import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { UserDto } from 'src/user/dto/user.dto';
import { loginUser } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
        private jwtService : JwtService,
    ){}

    helloWorld(){
        return this.userModel.findAll()
    }


    async signup(data : UserDto): Promise<any>{
        const emailExist = await this.userModel.findOne({where: {email: data.email}})
        if (emailExist) {
            throw new BadRequestException("email already exists")
        }

        const user = await this.userModel.create({
            name : data.name,
            email : data.email,
            password : data.password 
        })

        const payload = { id: user.id, name: user.name , email: user.email };
        return {
            token : await this.jwtService.signAsync(payload)
        }
    }
  
    async signin(data:loginUser): Promise<any>{
        const user = await this.userModel.findOne({where: {email : data.email}})
        if (user && user.password == data.password) {
            const payload = { id: user.id, name: user.name , email: user.email };
            return {
                token: await this.jwtService.signAsync(payload),
              };
        }else{
            throw new BadRequestException("Invalid user")
        }
    }
}
