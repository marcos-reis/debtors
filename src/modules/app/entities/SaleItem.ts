import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import Product from "./Product";
import Sale from "./Sale";
import Template from "./Template";

@Entity("sales-items")
export default class SaleItem extends Template {
  @OneToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => Sale)
  @JoinColumn({ name: "sale_id" })
  sale = Sale;

  @Column()
  sale_id: string;

  @Column()
  product_id: string;

  @Column()
  quantity: number;

  @Column("decimal", { precision: 12, scale: 2 })
  price: number;
}
