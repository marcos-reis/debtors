import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateSalesItems1604099848933
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "sales-items",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "quantity",
            type: "int",
          },
          {
            name: "price",
            type: "decimal(12,2)",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("sales-items");
  }
}