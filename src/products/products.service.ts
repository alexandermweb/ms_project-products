import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Not, Repository } from 'typeorm';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository:Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }

  async findAll(paginationDto:PaginationDto) {
    const { page, size } = paginationDto;

    const totalPages = await this.productRepository.count({
      where:{available: true},
    });

    const data = await this.productRepository.find( {
      where:{available: true},
      take: size,
      skip: (page! - 1) * size!
    });

    return {
      page,
      totalPages,
      data
    }
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where : { id, available: true } });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    if(!updateProductDto) throw new BadRequestException('No hay campos para actualizar');
    await this.findOne(id);
    const { id: _, ...toUpdate } = updateProductDto;
    await this.productRepository.update(id, toUpdate);
    const product = await this.productRepository.findOneBy({id});
    return product;
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    product.available = false; // actualizar internamente
    return this.productRepository.save(product);
  }
}
