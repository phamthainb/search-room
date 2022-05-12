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

  @Column({ unique: true, default: 'x' })
  name: string;

  @Column({ default: 'Mô tả phòng' })
  desc: string;

  @Column({ type: 'boolean', default: true })
  status: boolean; // true: trống, false: đang sd

  @Column({ default: 0 })
  price: number;

  @Column({ default: 1 })
  type: number; // 1, 2, 3
}
