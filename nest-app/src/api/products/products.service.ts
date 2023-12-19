import { Injectable } from '@nestjs/common';
import { IProduct, Status } from './product.model';
import { CreateProduct } from './dto/create-product.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductsService {
  private products: IProduct[] = [];

  findAll(): IProduct[] {
    return this.products;
  }

  findOne(id: string): IProduct {
    const product = this.products.find((product) => product.id === id);
    return product;
  }

  create(createProduct: CreateProduct): IProduct {
    const { title, description } = createProduct;

    const product: IProduct = {
      id: randomUUID(),
      status: Status.ACTIVE,
      title,
      description,
    };

    this.products.push(product);
    return product;
  }

  delete(id: string): void {
    this.products = this.products.filter((product) => product.id !== id);
  }

  update(id: string): IProduct {
    const indexOfProduct = this.products.findIndex((prod) => prod.id === id);
    const newStatus =
      this.products[indexOfProduct].status === Status.ACTIVE
        ? Status.INACTIVE
        : Status.ACTIVE;
    this.products[indexOfProduct].status = newStatus;

    return this.products[indexOfProduct];
  }
}
