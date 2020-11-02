import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import Stock from "./Stock";
import Template from "./Template";

@Entity("products")
export default class Product extends Template {
  @Column()
  name: string;

  @OneToOne(() => Stock, (stock) => stock.product, { eager: true })
  stock: Stock;

  @Column("decimal", { precision: 12, scale: 2 })
  price: number;
}
