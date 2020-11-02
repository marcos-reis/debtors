import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import Customer from "./Customer";
import Installment from "./Installment";
import SaleItem from "./SaleItem";
import User from "./User";
import Template from "./Template";

@Entity("sales")
export default class Sale extends Template {
  @OneToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @Column()
  customer_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: string;

  @OneToMany(() => Installment, (installments) => installments.sale)
  @JoinColumn({ name: "installment_id" })
  installments: Installment[];

  @OneToMany(() => SaleItem, (sale_itens) => sale_itens.sale)
  @JoinColumn({ name: "sale_item_id" })
  sale_items: SaleItem[];

  @Column("decimal", { precision: 12, scale: 2 })
  price: number;
}
