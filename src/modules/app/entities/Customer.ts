import { Column, Entity } from "typeorm";
import Template from "./Template";

@Entity("customers")
export default class Customer extends Template {
  @Column()
  name: string;

  @Column({ nullable: true })
  telephone: string;
}
