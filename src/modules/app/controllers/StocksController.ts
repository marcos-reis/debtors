import { Request, Response } from "express";
import { container } from "tsyringe";
import AddStockToProductService from "../services/products/AddStockToProductService";

export default class StocksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { quantity } = request.body;
    const { ProductId } = request.params;
    const { id } = request.user;

    const addStockToProduct = container.resolve(AddStockToProductService);

    const stock = await addStockToProduct.execute({
      quantity,
      product_id: ProductId,
      logged_user_id: id,
    });
    return response.json(stock);
  }
}
