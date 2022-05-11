import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  update_at: Date;

  @DeleteDateColumn({ nullable: true, type: 'timestamp' })
  delete_at: Date;
  //----------------------------------------------///

  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  username: string;

  @Column('varchar')
  password: string;
}
