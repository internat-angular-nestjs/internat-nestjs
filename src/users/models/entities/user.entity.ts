import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  familyUser: string;

  @Column()
  nameUser: string;

  @Column({ nullable: false, unique: true })
  emailUser: string;

  @Column()
  passwordUser: string;

  @Column()
  role: string;

  @Column("text", { name: "signature", nullable: true })
  signature: string | null;

  @Column("timestamp with time zone", { name: "dateOfBirth", nullable: true  })
  dateOfBirth: Date | null;

  @Column({ nullable: true })
  phoneNumber: string;
}
