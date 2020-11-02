import { Router } from "express";

import ProductsController from "../controllers/ProductsController";
import StocksController from "../controllers/StocksController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const productsController = new ProductsController();
const stocksController = new StocksController();

const productsRouter = Router();
productsRouter.post("/", ensureAuthenticated, productsController.create);
productsRouter.post(
  "/:ProductId/stocks",
  ensureAuthenticated,
  stocksController.create
);

export default productsRouter;
