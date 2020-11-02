import IUpdateProductsQuantityDTO, {
  ICreateProductDTO,
  IFindProducts,
} from "../../dtos/ProductDTOS";
import Product from "../../entities/Product";

export default interface IProductsRepository {
  findAllById(products: IFindProducts[]): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  updateQuantity(products: IUpdateProductsQuantityDTO[]): Promise<Product[]>;
  save(product: Product): Promise<Product>;
}
