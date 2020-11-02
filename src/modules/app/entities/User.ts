import { Column, Entity } from "typeorm";
import Template from "./Template";

@Entity("users")
export default class User extends Template {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  telephone: string;
}
