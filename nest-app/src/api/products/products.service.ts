import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IProduct, Status } from './product.model';
import { CreateProduct } from './dto/create-product.dto';
import { randomUUID } from 'crypto';
import { GetProductByFilter } from './dto/get-products-by-filter.dto';

@Injectable()
export class ProductsService {
  private products: IProduct[] = [];

  findWithFilters(productFilters: GetProductByFilter): IProduct[] {
    const { status, search } = productFilters;
    let productsByFilters: IProduct[] = this.products;

    if (status) {
      productsByFilters = productsByFilters.filter((product) => {
        return product.status === status;
      });
    }

    if (search) {
      productsByFilters = productsByFilters.filter((product) => {
        return product.title.includes(search);
      });
    }

    return productsByFilters;
  }

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
    try {
      const indexOfProduct = this.products.findIndex((prod) => prod.id === id);
      if (indexOfProduct !== -1) {
        const newStatus =
          this.products[indexOfProduct].status === Status.ACTIVE
            ? Status.INACTIVE
            : Status.ACTIVE;
        this.products[indexOfProduct].status = newStatus;
        return this.products[indexOfProduct];
      }
      throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
    } catch (err: any) {
      return err;
    }
  }
}
