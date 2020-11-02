import { Router } from "express";

import SalesController from "../controllers/SalesController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const salesController = new SalesController();

const salesRouter = Router();
salesRouter.post("/", ensureAuthenticated, salesController.create);

export default salesRouter;
