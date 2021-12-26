import { Length, Min } from 'class-validator';
import { BaseModel } from 'src/base/base.entity';
import { Role } from 'src/decorators/role.decorator';
import { Form } from 'src/form/entities/form.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class User extends BaseModel {
  @Column()
  @Length(6)
  name: string;
  @Column()
  @Min(0)
  age: number;
  @Column()
  @Index({ unique: true })
  @Length(10)
  email: string;
  @Column({ select: false })
  @Length(10)
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToOne(() => Form, (form) => form.user)
  form: Form;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
