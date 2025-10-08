import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('login')
export class Login {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;
}
