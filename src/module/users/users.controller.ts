import { Controller, Get, Post, Body, Patch, Param, Delete, Res} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService,private jwtService: JwtService) {}

  @Get("listAll")
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @Patch('/status/:id')
  async changeActiveUser(@Param('id') id: string, ) {
    try {
      const result = await this.usersService.update(+id);
      return {
        message: 'Cập nhật thành công',
        data: result 
      }
    } catch (error) {
      console.log(error);
    }  
  }
  @Patch('/active/:id')
  async changeAvatarUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    try {
    const {avatarPath} = body
    const result = await this.usersService.updateAvatar(+id,avatarPath);
    return {
      message: 'Cập nhật avatar thành công',
      data: result,
    };
  } catch (error) {
    console.log(error);
  }
  }


  @Post("/Login")
  async createUser(@Body() createUserDto: any, @Res() res) {
     if (createUserDto.email == "" || createUserDto.password == "") {
            return res.status(400).json({
                message: "Không được để trống Email hoặc Password",
            });
    }
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
     if (!regexEmail.test(createUserDto.email)) {
            return res.status(400).json({
                message: "Không đúng định dạng Email",
            });
    }
    const result = await this.usersService.getUserByEmail(createUserDto.email);
    const checkpassword = result && await argon2.verify(result.password, createUserDto.password);
   
    if (!checkpassword||!result) {
      return res.status(400).json({
        message: "Mật Khẩu hoặc Email không chính xác",
      })
    }
  
    const token= await this.jwtService.sign({result},{
      secret:"token"
    })

    return res.status(200).json({
      message: "Đăng Nhập thành công",
      token: token,
      data:result
    })
  }
  
  @Post("/Register")
  async create(@Body() createUserDto: any,@Res() res) {
    console.log(createUserDto);

    const result = await this.usersService.getUserByEmail(createUserDto.email);
    console.log("1111",result);
      if (createUserDto.username.length <6) {
            return res.status(400).json({
                message: "Tên nhập đủ 6 kí tự",
            });
    }
    if (!createUserDto.email || !createUserDto.password) {
            return res.status(400).json({
                message: "Không được để trống Email hoặc Password",
            });
    }
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const regexPass = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (!regexEmail.test(createUserDto.email)) {
            return res.status(400).json({
                message: "Không đúng định dạng Email",
            });
    }
    if (!regexPass.test(createUserDto.password)) {
            return res.status(400).json({
                message: "Mật khẩu: đủ 6 kí tự chữ cái đầu viết hoa có số",
            });
        }
    if (result) {
      return res.status(400).json({
        message: "Email đã được đăng kí",
      })
    }
      if (createUserDto.password!=createUserDto.password_cofirm) {
            return res.status(400).json({
                message: " Sai mật khẩu nhập lại",
            });
        }
     if (!createUserDto.allowExtraEmails) {
            return res.status(400).json({
            message: "Nhấn tích để xác nhận",
      });
    }
    
    const hashPassword = await argon2.hash(createUserDto.password);
    createUserDto.password = hashPassword;
    const user = await this.usersService.create(createUserDto);
    return res.status(200).json({
      message: "Đăng kí thành công",
    })
  
  }
}
