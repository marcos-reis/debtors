import { container } from "tsyringe";
import IUsersRepository from "../../modules/app/repositories/models/IUsersRepository";
import UsersRepository from "../../modules/app/repositories/implementations/UsersRepository";
import ICustomersRepository from "../../modules/app/repositories/models/ICustomersRepository";
import CustomersRepository from "../../modules/app/repositories/implementations/CustomersRepository";
import IProductsRepository from "../../modules/app/repositories/models/IProductsRepository";
import ProductsRepository from "../../modules/app/repositories/implementations/ProductsRepository";
import StocksRepository from "../../modules/app/repositories/implementations/StocksRepository";
import IStocksRepository from "../../modules/app/repositories/models/IStocksRepository";
import SalesRepository from "../../modules/app/repositories/implementations/SalesRepository";
import ISalesRepository from "../../modules/app/repositories/models/ISalesRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
container.registerSingleton<ICustomersRepository>(
  "CustomersRepository",
  CustomersRepository
);
container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);
container.registerSingleton<IStocksRepository>(
  "StocksRepository",
  StocksRepository
);
container.registerSingleton<ISalesRepository>(
  "SalesRepository",
  SalesRepository
);
