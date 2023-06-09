import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ITokens } from '../../admin/interfaces/IToken';
import { Request, Response } from 'express';
import { SignInAuthDto } from '../dto/sign-in-auth.dto';

@Controller('auth')
export class AuthController {



  constructor(
    private readonly authService: AuthService
  ){}

  @Post('sign-in')
  async signIn(
    @Body() body: SignInAuthDto,
    @Res() res: Response
  ){
    try {
      const tokens: ITokens = await this.authService.signIn(body);
      return res.status(HttpStatus.OK).json(tokens);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get('logout')
  async logout(
    @Req() req: Request,
    @Res() res: Response
  ){
    try{
      await this.authService.logout(req.headers.authorization.split(' ')[1]);
      return res.status(HttpStatus.OK).json('logout');
    } catch (err) {
      throw new BadRequestException(err);
    }

  }

  @Put('update-access')
  async refreshTokens(
    @Body() body: {refreshToken: string},
    @Res() res: Response
  ){
    try{
      const {refreshToken} = body;
      const accessToken = await this.authService.updateAccessToken(refreshToken);
      return res.status(HttpStatus.OK).json(accessToken);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
