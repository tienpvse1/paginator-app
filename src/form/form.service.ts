import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { Role } from 'src/decorators/role.decorator';
import { UserService } from 'src/user/user.service';
import { CreateFormDto } from './dto/create-form.dto';
import { Form, FormStatus } from './entities/form.entity';
import { FormRepository } from './form.repository';

@Injectable()
export class FormService extends CRUDService<Form, FormRepository> {
  constructor(
    @InjectRepository(FormRepository) repository: FormRepository,
    private userService: UserService,
  ) {
    super(repository);
  }

  async createForm(form: CreateFormDto, userId: string) {
    const user = await this.userService.findById(userId);
    const newForm = this.repository.create(form);
    newForm.user = user;

    return newForm.save();
  }

  async findForm(userId: string) {
    return this.userService.findOne({
      where: { id: userId },
      relations: ['form'],
    });
  }

  async updateFormStatus(id: string, formStatus: FormStatus) {
    const form = await this.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
    form.status = formStatus;
    // if the form is accepted, update user role as well
    if (formStatus === FormStatus.ACCEPTED)
      this.userService.update({ role: Role.MANAGER }, form.user.id);
    else this.userService.update({ role: Role.USER }, form.user.id);
    return form.save();
  }
}
