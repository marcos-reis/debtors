import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Sale from "./Sale";
import Template from "./Template";

@Entity("installments")
export default class Installment extends Template {
  @ManyToOne(() => Sale)
  @JoinColumn({ name: "sale_id" })
  sale = Sale;

  @Column()
  number: number;

  @Column("decimal", { precision: 12, scale: 2 })
  price: number;

  @Column()
  situation: "pending" | "overdue" | "paid";
}
