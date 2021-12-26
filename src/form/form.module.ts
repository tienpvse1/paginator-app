import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormRepository } from './form.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [FormController],
  providers: [FormService],
  imports: [TypeOrmModule.forFeature([FormRepository]), UserModule],
})
export class FormModule {}
