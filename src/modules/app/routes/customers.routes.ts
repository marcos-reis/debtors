import { Router } from "express";

import CustomersController from "../controllers/CustomersController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const customersController = new CustomersController();

const customersRouter = Router();
customersRouter.post("/", ensureAuthenticated, customersController.create);

export default customersRouter;
