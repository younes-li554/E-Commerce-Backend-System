import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Define user roles
export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // User email must be unique
  @Column({ unique: true })
  email: string;

  // Store hashed password (NOT plain text)
  @Column()
  password: string;

  // User role (ADMIN or CUSTOMER)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;
    orders: any;
}