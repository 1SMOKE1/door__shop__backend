import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { ITokens } from '../../admin/interfaces/IToken';
import { AdminService } from '../../admin/services/admin.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { AdminEntity } from '../../admin/admin.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ){}

  async signIn( body: CreateAdminDto ): Promise<ITokens> {
    
    const { email, password } = body;

    const user = await this.adminService.getOneByEmail(email);

    if(user === null){
      throw new HttpException('Sorry user with this email doesn`t exists', HttpStatus.NOT_FOUND);
    }


    if(!await compare(password, user.password))
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED)
    

  

    

    const tokens = await this.getTokens(user);

    await this.updateRefreshToken(user);
    
  

    return tokens;
  }

  private async getTokens ( body: AdminEntity ): Promise<ITokens>{

    const { email, id } = body;

    const payload = { email, sub: id};

    const [access_token, refresh_token] = await this.initTokens(payload);

    return {
      access_token,
      refresh_token
    }
  }
    

  async updateRefreshToken( body: AdminEntity ) {

    const { id, email } = body;

    const payload = { email, sub: id};

    const newRefreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d'
    })
    await this.adminService.updateUser(id, {
      refresh_token: newRefreshToken
    });

  }

  async logout(token: string) {
    return this.adminService.updateUser(this.jwtService.decode(token).sub, { refresh_token: null });
  }

  async updateAccessToken(token: string): Promise<{access_token: string}>{

    const email = this.jwtService.decode(token)['email'];

    const id = this.jwtService.decode(token).sub;

    const payload: {id: number, email: string} = {email, id};

    const newAccessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: '1h'
    })


    return {access_token: newAccessToken};
  }

  async initTokens(payload: {email: string, sub: number}){
    return Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '1h'
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d'
      })
    ])
  }
}
