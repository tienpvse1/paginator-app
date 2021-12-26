import { IsEnum, Length } from 'class-validator';
import { BaseModel } from 'src/base/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

export enum FormStatus {
  PENDING = 'pending',
  ACCEPTED = 'accept',
  REJECTED = 'rejected',
}

@Entity()
export class Form extends BaseModel {
  @Column()
  @Length(0, 50)
  title: string;
  @Column({ nullable: true })
  description: string;

  @Column({ enum: FormStatus, type: 'enum', default: FormStatus.PENDING })
  @IsEnum(FormStatus)
  status: FormStatus;

  @OneToOne(() => User, (user) => user.form)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
