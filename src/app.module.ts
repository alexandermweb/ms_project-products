import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      entities: [Product],
      synchronize: true, // ❗ Solo en desarrollo
    }),

    ProductsModule
  ],
})
export class AppModule {}
