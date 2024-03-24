import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }
  
  async getAllUsers() {
    const users = await this.userRepository.find({});
    // console.log(users);
    return users
  }
  async update(id: number) {
    const user = await this.userRepository.findOne({ where: { idUser : id } });
    console.log(user);
    if (user.status==1) {
      const updateActive = await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({ status: 0 })
      .where("idUser=:id", { id })
      .execute();
      return updateActive
    }else{
      const updateActive1 = await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({ status: 1 })
      .where("idUser=:id", { id })
      .execute();
      return updateActive1 ;
    }
  }
  async updateAvatar(id: number, avatarPath: string): Promise<UserEntity> {
     
    const user = await this.userRepository.findOne({
       where : { idUser : id },
     });
     
    if (!user) {
      throw new Error('Người dùng không tồn tại');
    }

    user.img = avatarPath;
    return await this.userRepository.save(user);
  }
  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email } });
  }
  async create(createUserDto: any) {
    return await this.userRepository.createQueryBuilder("user").insert().into(UserEntity).values({
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
      status: createUserDto.status
     }).execute();
  }
}
