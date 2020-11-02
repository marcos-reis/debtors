import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import Product from "./Product";
import Template from "./Template";

@Entity("stocks")
export default class Stock extends Template {
  @Column()
  product_id: string;

  @OneToOne(() => Product, (product) => product.stock)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column()
  quantity: number;
}
