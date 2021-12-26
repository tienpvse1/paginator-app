import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { Form } from './entities/form.entity';

@EntityRepository(Form)
export class FormRepository extends BaseRepository<Form> {}
