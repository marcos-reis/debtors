import { Router } from "express";

import usersRouter from "../../../../modules/app/routes/users.routes";
import customersRouter from "../../../../modules/app/routes/customers.routes";
import sessionsRouter from "../../../../modules/app/routes/sessions.routes";
import productsRouter from "../../../../modules/app/routes/products.routes";
import salesRouter from "../../../../modules/app/routes/sales.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/customers", customersRouter);
routes.use("/products", productsRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/sales", salesRouter);

export default routes;
