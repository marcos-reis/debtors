import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateProductService from "../services/products/CreateProductService";

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price } = request.body;
    const { id } = request.user;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      price,
      logged_user_id: id,
    });
    return response.json(product);
  }
}
