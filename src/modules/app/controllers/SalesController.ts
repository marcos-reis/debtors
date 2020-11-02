import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateSaleService from "../services/sales/CreateSaleService";

export default class SalesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products, installments } = request.body;
    const { id } = request.user;

    const createSale = container.resolve(CreateSaleService);

    const Sale = await createSale.execute({
      installments,
      customer_id,
      products,
      logged_user_id: id,
    });
    return response.json(Sale);
  }
}
