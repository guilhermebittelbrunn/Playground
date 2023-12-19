import { Module } from '@nestjs/common';
import { ProductsModule } from './api/products/products.module';
import { UsersModule } from './api/users/users.module';

@Module({
  imports: [ProductsModule, UsersModule],
})
export class AppModule {}
