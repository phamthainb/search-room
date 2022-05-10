import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rooms')
export class Room extends BaseEntity {
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

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column({ type: 'boolean', default: true })
  status: boolean; // true: trống, false: đang sd

  @Column()
  price: number;

  @Column()
  type: number; // 1, 2, 3
}
