import { Module, forwardRef } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/admin_auth/admin_auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    JwtModule.register({}),
    forwardRef(() => AuthModule),
    JwtModule.register({ global: true }),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
