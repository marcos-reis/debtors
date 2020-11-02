import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AddProductIdToStocks1604284887730
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "stocks",
      new TableColumn({
        name: "product_id",
        type: "uuid",
        isNullable: true,
      })
    );
    await queryRunner.createForeignKey(
      "stocks",
      new TableForeignKey({
        name: "StockProduct",
        columnNames: ["product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "products",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("stocks", "StockProduct");
    await queryRunner.dropColumn("stocks", "product_id");
  }
}
