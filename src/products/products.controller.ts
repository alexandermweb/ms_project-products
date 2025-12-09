import { Controller, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { get } from 'http';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @MessagePattern({ cmd: 'create-product' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }


  @MessagePattern({ cmd: 'findAll-products' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'findOne-product' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }


  @MessagePattern({ cmd: 'update-product' })
  update(
    @Payload() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern({ cmd: 'delete-product' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }


  @MessagePattern({ cmd: 'validate-products' })
  validateProducts(@Payload() ids:number[]){
    return this.productsService.validateProducts(ids);
  }

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productsService.create(createProductDto);
  // }


  // @Get()
  // findAll(@Query() paginationDto: PaginationDto) {
  //   console.log(paginationDto);
  //   return this.productsService.findAll(paginationDto);
  // }


  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.productsService.findOne(id);
  // }


  // @Patch(':id')
  // update(
  //   @Param('id') id: number, 
  //   @Body() updateProductDto: UpdateProductDto
  // ) {
  //   return this.productsService.update(id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.productsService.remove(id);
  // }
}

