// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from './admin_auth.controller';
import { AdminsService } from './admin_auth.service';
import { MailModule } from '../../mail/mail.module';
import { MailService } from '../../mail/mail.service';
import { Admin, AdminSchema } from '../../admin/schemas/admin.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    JwtModule.register({
      secret: 'MyVeryVerySECRETKey',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    JwtModule.register({ global: true }),
    MailModule,
  ],
  controllers: [AdminController],
  providers: [AdminsService, MailService],
  exports: [AdminsService, JwtModule],
})
export class AuthModule {}
