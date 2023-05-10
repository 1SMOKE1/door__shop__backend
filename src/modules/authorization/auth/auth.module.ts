import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { AdminService } from '../admin/services/admin.service';
import { AccessTokenStrategy } from './strategies/access.srategy';
import { RefreshTokenStrategy } from './strategies/refresh.strategy';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    AdminModule,
    JwtModule.register({})
  ],
  providers: [
    AuthService,
    AdminService,
    AccessTokenStrategy,
    RefreshTokenStrategy
  ],
  controllers: [AuthController],
  exports: [
    AuthService,
    JwtModule,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ]
})
export class AuthModule {}
